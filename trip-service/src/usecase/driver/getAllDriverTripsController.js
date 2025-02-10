export class GetAlltripsUseCase {
    constructor(dependencies) {
      this.tripRepository = new dependencies.repository.MongoTripRepository();
    }
    async execute(driverId) {
      try {
        const tripDetails = await this.tripRepository.getTripsByDriverId(
          driverId
        );
  
        const getDriversTotalTripCount =
          await this.tripRepository.getDriversTotalTripCount(driverId);
  
        return {
          tripDetails,
          getDriversTotalTripCount,
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  