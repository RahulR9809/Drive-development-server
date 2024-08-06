export class VerifyOtpController {
  constructor(dependencies) {
    this.verifyAuthUseCase = new dependencies.useCase.DriverVerifyOtpUseCase(
      dependencies
    );
  }
  async verifyOtp(req, res, next) {
    try {
      const { otp } = req.body;
      if (!otp) {
        const error = new Error();
        error.status = 400;
        error.message = "Otp Error";
        throw error;
      } 
      const { data } =
          await this.verifyAuthUseCase.execute(
          req.session,
          otp
        )
      res
        .status(200)
        .json({ data, message: "Otp Verification SucessFull" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}