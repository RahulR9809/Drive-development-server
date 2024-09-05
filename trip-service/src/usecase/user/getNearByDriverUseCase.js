export class GetNearByDriverUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(userId, pickupLocation) {
    try {
      
      const parsedLongitude = parseFloat(pickupLocation?.pickupLongitude);
      const parsedLatitude = parseFloat(pickupLocation?.pickupLatitude);

      const pickupCoordinates = [parsedLongitude, parsedLatitude];

      const nearestDriver =
        await this.driverRepository.findNearstDriversAvailable(
          pickupCoordinates
        );
      console.log("nearest", nearestDriver);
      return nearestDriver;
    } catch (error) {
      console.error(error);
    }
  }
}
