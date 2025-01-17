// import { KafkaClient } from "../../events/KafkaClient.js";
// import { TRIP_TOPIC,PAYMENT_CANCELLED } from "../../events/config.js";
// import { notifyDriver } from "../../utils/socket.js";


// export class CancelRideUseCase {
//   constructor(dependencies) {
//     this.tripRepository = new dependencies.repository.MongoTripRepository();
//     this.kafka = new KafkaClient()
//   }
//   async execute(cancelInfo) {
//     try {
//         const { userId, tripId,cancelReason } = cancelInfo;
//         if(!userId || !cancelReason || !tripId){
//             const error = new Error()
//              error.message = "Bad Request"
//              error.status = 400
//              throw error
//         }
       
//         // if (tripId && userId) {
//         //   const trip = await this.tripRepository.findTrip(tripId);
//         //   if (trip.requestStatus == "accepted") {
//         //     const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
//         //       trip._id,
//         //       {
//         //         requestStatus: "cancelled",
//         //         tripStatus: "cancelled",
//         //         cancellationReason: cancelInfo.cancelReason
//         //       }
//         //     );
//         //     const compensation = cancelTrip?.fare * 20/100
//         //     notifyDriver(
//         //       "ride-cancelled",
//         //       cancelTrip?.cancellationReason,
//         //       trip.driverId
//         //     )
//         //   this.kafka(TRIP_TOPIC,{
//         //     type:PAYMENT_CANCELLED,
//         //     message:""
//         //   })
//             // return {
//             //   cancelPeriod: "After Accepting Ride",
//             //   fineAmount:compensation
//             // };
//           // }
//           // if (trip.requestStatus == "started") {
//           //   const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(trip._id,{requestStatus: "cancelled",tripStatus: "cancelled",cancellationReason: cancelInfo.cancelReason});
//           //   notifyDriver(  "ride-cancelled",
//           //       cancelTrip?.cancellationReason,
//           //       trip.driverId)
//           //   const compensation = cancelTrip?.fare * 45/100
                
//           //       return {
//           //           cancelPeriod: "After starting Ride",
//           //           fineAmount:compensation
//           //         };
//           // }
//           const trip = await this.tripRepository.findTrip(tripId)
//           if (trip.requestStatus == "pending" || trip.requestStatus == "rejected" || trip.requestStatus == "accepted" ) {
//             const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
//               trip._id,
//               {
//                 requestStatus: "cancelled",
//                 tripStatus: "cancelled",
//                 cancellationReason: cancelInfo.cancelReason,
//               }
//             );
//             console.log("tripcancelled",cancelTrip);
//             if(trip.requestStatus == "accepted"){
//               notifyDriver('cancel-ride',cancelInfo?.cancelReason,cancelTrip?.driverId)
//             }
//             return
//           }
//         }
//     catch (error) {
//         throw error
//     }
   
//   }
// }




import { KafkaClient } from "../../events/KafkaClient.js";
import { notifyDriver } from "../../utils/socket.js";

export class CancelRideUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.kafka = new KafkaClient();
  }
  async execute(cancelInfo) {
    try {
      const { userId, tripId, cancelReason } = cancelInfo;
      console.log(' three parameter',userId, tripId, cancelReason)
      if (!userId || !cancelReason || !tripId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }

      const trip = await this.tripRepository.findTrip(tripId);
      console.log(trip.requestStatus);
      if (trip.requestStatus === "cancelled") {
        const error = new Error();
        error.message = "The Ride Has Been Cancelled Already";
        error.status = 400;
        throw error;
      }
      if (
        trip.requestStatus == "pending" ||
        trip.requestStatus == "rejected" ||
        trip.requestStatus == "accepted"
      ) {
        const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
          trip._id,
          {
            requestStatus: "cancelled",
            tripStatus: "cancelled",
            cancellationReason: cancelInfo.cancelReason,
          }
        );
    console.log(' request status',trip.requestStatus)

        if (trip.requestStatus == "accepted") {
          notifyDriver(
            "cancel-ride",
            cancelInfo?.cancelReason,
            cancelTrip?.driverId?._id
          );
        }
        return;
      }
    } catch (error) {
      console.error("errr in resp", error);
      throw error;
    }
  }
}