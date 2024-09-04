import { WalletRecordUpates } from "../../helpers/walletRecordUpdate.js";
export class WalletPaymentUseCase {
  constructor(dependencies) {
    this.paymentRepository =
      new dependencies.repository.MongoPaymentRepository();
    this.walletUpdates = new WalletRecordUpates();

        this.userRepository = new dependencies.repository.MongoUserRepository()
    //     this.tripRepository = new dependencies.repository.MongoTripRepository()
    //     this.driverRepository =  new dependencies.repository.MongoDriverRepository()
    //     this.walletRepository = new dependencies.repository.MongoWalletRepository()
    //     this.comapnyWalletRepository =  new dependencies.repository.MongoCompanyWalletRepository()
  }
  async execute(data) {
    try {
      const { userId, tripId, driverId, paymentMethod, fare } = data;
      const userDetails = await this.userRepository.findUserById(userId)
      const {walletBalance}  = userDetails
      if(walletBalance<fare){
        const error = new Error()
        error.message('No Sufficient Balance in Wallet')
        error.status = 400
        throw error
      }
      const payment = await this.paymentRepository.findPaymentByTrip_Update(
        tripId,
        {
          fare,
          paymentStatus: "paid",
        }
      );
      // console.log("payment",payment);
      const {
        driverWalletHistory,
        driverBalanceUpdate,
        companyWalletUpdate,
        deductUserWalletBalance,
        userWalletHistory,
      } = await this.walletUpdates.UpdateWallets(fare, driverId, tripId, paymentMethod, userId);
      console.log("logger 2");
      
      return {

      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
