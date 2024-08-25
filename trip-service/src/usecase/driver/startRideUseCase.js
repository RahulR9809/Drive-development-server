export class StartRideUseCase{
constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
}
async execute(userOtp,bodyOtp,tripId) {
    try {
        console.log("==============>userotp",userOtp,bodyOtp);
        
        if(userOtp === bodyOtp){
            const dataToUpdate ={
                tripStatus:'started'
            }
            console.log("in useCase====================>");
            
          const updateTripStatus =  await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)
          console.log('updateTrip',updateTripStatus);
          return updateTripStatus
        }
        console.log("not in condition=============");
        
    } catch (error) {
        console.error(error)
    }
    
}
}