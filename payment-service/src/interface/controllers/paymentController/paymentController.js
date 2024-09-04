export class PaymentController {
  constructor(dependencies) {
    this.stripePaymentUseCase = new dependencies.useCase.StripePaymentUseCase(
      dependencies
    );
    this.codUseCase = new dependencies.useCase.CashOnDeliveryUseCase(
      dependencies
    );
    this.walletPaymentUseCase = new dependencies.useCase.WalletPaymentUseCase(dependencies)
  }
  async payment(req, res, next) {
    try {
      // const {paymentMethod} = req.body
      // // if(paymentMethod == 'COD'){
      // //     const paymentVia_COD = await this.codUseCase.execute(req.body)
      // //     res.status(201).json({status:true,message:'success'})
      // // }
      //  if(paymentMethod == 'Online-Payment'){
      //    const payment = await this.stripePaymentUseCase.execute(req.body)
      //    res.status(201).json({success:true,payment:payment?.createStripeSession})
      // }
      const { userId, tripId, driverId, paymentMethod, fare } = req.body;
      if (!userId || !tripId || !driverId || !paymentMethod || !fare) {
        const error = new Error();
        error.status = 400;
        error.message = "Bad Request!";
        throw error;
      }
      if (paymentMethod === "Online-Payment") {
        const initiateOnlinePayment = await this.stripePaymentUseCase.execute(
          req.body
        );
        res
          .status(201)
          .json({
            success: true,
            payment: initiateOnlinePayment?.createStripeSeesion,
          });
      } else if (paymentMethod === "Wallet") {
        const initiateWalletPayment = await this.walletPaymentUseCase.execute(req.body)
        res.status(201).json({success:true})
      } else {
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
