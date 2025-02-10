export class GetTripHistoryUseCase{
    constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(userId){
        try {
          const getTripHistoryByUserId  =   await this.tripRepository.findAllTripsOfUsers(userId)
          const getTripCountPerUser = await this.tripRepository.findTripCountPerUser(userId)
          return {
            getTripHistoryByUserId,
            getTripCountPerUser
          }
        } catch (error) {
            console.error(error);
            
        }
    }
}

