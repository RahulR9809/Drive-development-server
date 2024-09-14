export class DriverRegisterController {
  constructor(dependencies) {
    this.registerUseCase = new dependencies.useCase.DriverRegisterUseCase(
      dependencies
    );
  }
  async registerDriver(req, res, next) {
    try {
      const { userId, otp } = await this.registerUseCase.execute(req.body);
      // req.session.userId = userId;
      // req.session.otp = otp;
      req.session.otpDetails ={userId,otp}
      res.status(200).json({message:'OTP send Verify to Register Your Account'})
    } catch (error) {
      console.log('next function of error');
      console.error(error);
      next(error)
    }
  }
}
