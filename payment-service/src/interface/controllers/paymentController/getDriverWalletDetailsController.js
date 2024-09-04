export class GetDriverWalletDetailsController {
  constructor(dependencies) {
    this.getDriverWalletDetailsUseCase =
      new dependencies.useCase.GetDriverWalletDetailsUseCase(dependencies);
  }
  async getDriverWalletDetails(req, res, next) {
    try {
      const { driverId } = req.params;
      const getDriverWalletData =
        await this.getDriverWalletDetailsUseCase.execute(driverId);
        console.log("getDrverwallet",getDriverWalletData);
        
      res
        .status(201)
        .json({
          driverBalance: getDriverWalletData?.driverWalletBalance,
          driverWalletHistory: getDriverWalletData?.getDriverWalletHistory,
        });
    } catch (error) {
      console.error(error);
    }
  }
}
