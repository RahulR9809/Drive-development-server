export class PaymentController{
    constructor(dependencies){
this.stripePaymentUseCase = new dependencies.useCase.StripePaymentUseCase(dependencies)
this.codUseCase = new dependencies.useCase.CashOnDeliveryUseCase(dependencies)
    }
    async payment(req,res,next){
        try {
            const {paymentMethod} = req.body
            // if(paymentMethod == 'COD'){
            //     const paymentVia_COD = await this.codUseCase.execute(req.body)
            //     res.status(201).json({status:true,message:'success'})
            // }
             if(paymentMethod == 'Online-Payment'){
               const payment = await this.stripePaymentUseCase.execute(req.body)
               res.status(201).json({success:true,payment:payment?.createStripeSession}) 
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}