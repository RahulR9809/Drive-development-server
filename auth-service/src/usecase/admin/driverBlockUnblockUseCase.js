export class DriverBlockUnblockUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(driverId) {
    const getDriver = await this.driverRepository.findDriverbyId(driverId);
    console.log(getDriver);
    if (getDriver) {
      console.log(!getDriver.isBlocked)
      const updateDriver = await this.driverRepository.getDriverByIdAndUpdate(
        driverId,
        {isBlocked:!getDriver.isBlocked}
      );
      return updateDriver
    } else {
    }
  }
}
