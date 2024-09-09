import { notifyDriver } from "../../utils/socket.js";

export class CancelRideUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
  }
  async execute(cancelInfo) {
    try {
        const { userId, tripId,cancelReason } = cancelInfo;
        if(!userId || !cancelReason){
            const error = new Error()
             error.message = "Bad Request"
             error.status = 400
             throw error
        }
        if (!tripId) {
          const trip = await this.tripRepository.findTripByUserId(userId);
          console.log("trips=>",trip);
          console.log(trip.requestStatus);
          
          if (trip.requestStatus == "pending" || trip.requestStatus == "rejected" ) {
            console.log("inside the condition");
            
            const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
              trip._id,
              {
                requestStatus: "cancelled",
                tripStatus: "cancelled",
                cancellationReason: cancelInfo.cancelReason,
              }
            );
            console.log("tripcancelled",cancelTrip);
            
            return {
              cancelPeriod: "before Accepting",
            };
          }
        }
        if (tripId && userId) {
          const trip = await this.tripRepository.findTrip(tripId);
          if (trip.requestStatus == "accepted") {
            console.log("accepted");
            
            const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
              trip._id,
              {
                requestStatus: "cancelled",
                tripStatus: "cancelled",
                cancellationReason: cancelInfo.cancelReason,
              }
            );
            const compensation = cancelTrip?.fare * 20/100
            notifyDriver(
              "ride-cancelled",
              cancelTrip?.cancellationReason,
              trip.driverId
            );
            return {
              cancelPeriod: "After Accepting Ride",
              fineAmount:compensation
            };
          }
          if (trip.requestStatus == "started") {
            const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(trip._id,{requestStatus: "cancelled",tripStatus: "cancelled",cancellationReason: cancelInfo.cancelReason});
            notifyDriver(  "ride-cancelled",
                cancelTrip?.cancellationReason,
                trip.driverId)
            const compensation = cancelTrip?.fare * 45/100
                
                return {
                    cancelPeriod: "After starting Ride",
                    fineAmount:compensation
                  };
          }
        }
    } catch (error) {
        throw error
    }
   
  }
}
