export class DriverApprovalUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(driverId) {
    try {
      const approveDriver =
        await this.driverRepository.findDriverByIdAndApprove(driverId);
        console.log(approveDriver);
      return;
    } catch (error) {
      console.error(error);
    }
  }
}
