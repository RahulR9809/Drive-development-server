import { userNotify } from "../../utils/socket.js";
import generateOTP from "../../utils/generateOtp.js";
import sendMail from "../../utils/nodemailer.js";
export class AcceptRideUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(tripId,driverId,status){
        try {
            const dataToUpdate = {
                driverId:driverId,
                requestStatus:status,
                tripStatus:status
            }
            console.log('accepted',dataToUpdate);
           const acceptRequest =  await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)
           const findTrip = await this.tripRepository.findTrip(tripId)
           const findUserEmail =findTrip.userId?.email
         const otp =   generateOTP()
        //  req.session.otp = otp
           await sendMail(otp,findUserEmail)
        //    const updateDriverStatus = await this.driverRepository.updateDriverStatus(driverId,'Busy')
           userNotify('rideAccepted',acceptRequest,acceptRequest.userId)
           return {acceptRequest,otp}
        } catch (error) {
            console.error(error)
        }
    }
}
