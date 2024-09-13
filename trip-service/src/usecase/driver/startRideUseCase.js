import { userNotify } from "../../utils/socket.js";

export class StartRideUseCase{
constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
}
async execute(userOtp,bodyOtp,tripId) {
    try {
        if(userOtp === bodyOtp){
            const dataToUpdate ={
                tripStatus:'started'
            }
            
          const updateTripStatus =  await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)
          userNotify('ride-started','started',updateTripStatus?.userId)
          console.log('updateTrip',updateTripStatus);
          return updateTripStatus
        }
        console.log("not in condition=============");
        
    } catch (error) {
        console.error(error)
    }
    
}
}