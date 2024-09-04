export class GetDriverWalletBalanceController {
  constructor(dependencies) {
    this.getDriverWalletUseCase =
      new dependencies.useCase.GetDriverWalletBalanceUseCase(dependencies);
  }
  async getDriverBalance(req, res, next) {
    try {
        const {driverId} = req.params
        console.log(driverId);
        const getDriverWalletBalance = await this.getDriverWalletUseCase.execute(driverId)
        console.log("getBalance",getDriverWalletBalance);
        
        res.status(201).json({balance:getDriverWalletBalance})
    } catch (error) {
        console.error(error);
        
    }
  }
}
