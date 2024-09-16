import { creatStripSession } from "../../utils/stripeSession.js";
import { WalletRecordUpates } from "../../helpers/walletRecordUpdate.js";

export class StripePaymentUseCase {
  constructor(dependencies) {
    this.paymentRepository =new dependencies.repository.MongoPaymentRepository();
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.walletUpdates = new WalletRecordUpates()
  }
  async execute(data) {
    try {
      const { userId, tripId, paymentMethod, fare, driverId } = data;
      const [userDetails, tripDetails] = await Promise.all([
        this.userRepository.findUserById(userId),
        this.tripRepository.findTripById(tripId),
      ]);
      const stripeSession = await creatStripSession(
        userDetails?.email,
        tripId,
        tripDetails?.pickUpLocation,
        tripDetails?.dropOffLocation,
        fare
      );

      const payment = await this.paymentRepository.findPaymentByTrip_Update(
        tripId,
        {
          fare,
          paymentStatus: "paid",
        }
      );
      const { driverWalletHistory, driverBalanceUpdate, companyWalletUpdate } =
        await this.walletUpdates.UpdateWallets(fare, driverId, tripId,paymentMethod);
        console.log('stripesessopm',stripeSession);
        console.log(payment);
        
        
      return {
        stripeSession,
        payment,
      };
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
