export class GetTripDetailsUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
  }
  async execute(userId) {
    try {
        const getTripDetails = await this.tripRepository.findAllTrips(userId)
        return getTripDetails
    } catch (error) {
      console.error(error);
    }
  }
}
