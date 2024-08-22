export class RejectRideUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(driverId,data){
        try {

            await this.tripRepository.findTripByIdAndReject(driverId,data)
        } catch (error) {
            console.error(error)
        }
    }
}