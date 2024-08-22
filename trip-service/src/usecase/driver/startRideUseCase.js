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
          return 
        }
    } catch (error) {
        console.error(error)
    }
    
}
}