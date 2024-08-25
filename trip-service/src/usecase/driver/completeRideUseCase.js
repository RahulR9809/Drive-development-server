import { KafkaClient } from "../../events/KafkaClient.js";
import { userNotify } from "../../utils/socket.js";

export class CompleteRideUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.kafka = new KafkaClient()
  }
  async execute(tripId,userId){
    try {
      console.log("inside the execure==============>");
      
        const dataToUpdate = {
            tripStatus:'completed'
        }
        console.log("inside the repository====>");
        
       const completeRide =  await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)

       const dataToPublish = {
        _id:completeRide?._id,
        userId:completeRide?.userId,
        driverId:completeRide?.driverId,
        tripStatus:completeRide?.tripStatus,
        requestStatus:completeRide?.requestStatus,
        rejectedDrivers:completeRide?.rejectedDrivers,
        fare:completeRide?.fare,
        startLocation:completeRide?.startLocation,
        endLocation:completeRide?.endLocation,
        startTime:completeRide?.startTime,
        endTime:completeRide?.endTime,
        distance:completeRide?.distance,
        duration:completeRide?.duration,
        pickupLocation:completeRide?.pickupLocation,
        dropOffLocation:completeRide?.dropOffLocation,
        createdAt:completeRide?.createdAt
       }

       this.kafka.produceMessage(TRIP_TOPIC,{
        type:TRIP_UPDATED,
        value:JSON.stringify(dataToPublish)
      })

       console.log('ride',completeRide);
       
       console.log("before==========>")
      userNotify('ride-complete','trip-finished',userId)
      console.log("after==========>")

      return completeRide
    } catch (error) {
        console.error(error)
    }
  }
}
