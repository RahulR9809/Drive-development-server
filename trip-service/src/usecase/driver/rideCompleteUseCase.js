

export class RideCompleteUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(tripId){
        try {
            const dataToUpdate={
                tripStatus:'completed'
            }
            await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)
        } catch (error) {
            console.error(error)
        }
    }
}