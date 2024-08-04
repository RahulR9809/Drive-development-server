export class DriverDetailsController {
  constructor(dependencies) {
    this.getDriverDetailUseCase =
      new dependencies.useCase.GetDriverDetailsUseCase(dependencies);
  }
  async getDriverDetails(req, res, next) {
    const { driverId } = req.params;
    const driverDetails = await this.getDriverDetailUseCase.execute(driverId);
    console.log(driverDetails);
    res.status(200).json({ driverDetails: driverDetails, message: "sucess" });
  }
}
