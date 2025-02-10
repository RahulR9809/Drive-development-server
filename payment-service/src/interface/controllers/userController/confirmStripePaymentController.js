import { retrieveSessionData } from "../../../utils/stripeSession.js";

export class ConfirmStripePaymentController {
  constructor(dependencies) {
    this.confirmStripePaymentUseCase =
      new dependencies.useCase.ConfirmStripePaymentUseCase(dependencies);
  }
  async confirmPayment(req, res, next) {
    try {
      const { userId, tripId, driverId, paymentMethod, fare, paymentStatus } =
        req.body;
      if (!userId || !tripId || !driverId ||!paymentMethod ||!fare ||!paymentStatus){
        const error = new Error('Bad Request')
        error.status = 400
        throw error
      }
        await this.confirmStripePaymentUseCase.execute(
          userId,
          tripId,
          driverId,
          paymentMethod,
          fare
        );
        res.status(201).json({success:true,paymentStatus:"paid"})
      //       console.log('r{success:true,paymentStatus:"paid"}equest inside the confirm');
      //       const {session_id} = req.query
      //       console.log(session_id)
      //       // const {userId,tripId,driverId, paymentMethod, fare,sessionId } = req.body
      //   // if(!userId || !tripId || !driverId || !paymentMethod || !fare ||!sessionId){
      //   //     const error = new Error()
      //   //     error.status = 400
      //   //     error.message = "Bad Request"
      //   //     throw error
      //   // }
      // const stripeSession =   await retrieveSessionData(sessionId)
      // console.log('this is the stripesession',stripeSession)
      // console.log('stipe session payment status',stripeSession.payment_status)

      // if(stripeSession.payment_status === "paid"){
      //   await this.confirmStripePaymentUseCase.execute(userId,tripId,driverId,paymentMethod,fare)
      //   res.status(201).json({success:true,paymentStatus:"paid"})
      // }else{
      //   // await this.cancelPaymentUseCase.execute(userId)
      //   console.log('canceled');

      // }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
