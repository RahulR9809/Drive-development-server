export class WalletController{
    constructor(dependencies){
        this.walletUseCase = new dependencies.useCase.WalletPaymentUseCase(dependencies)
    }
    async walletPayment(req,res,next){
        try {   
            console.log(req.body);
         const walletPayment  =  await this.walletUseCase.execute(req.body)
          
        } catch (error) {
            console.error(error)
        }
    }
}