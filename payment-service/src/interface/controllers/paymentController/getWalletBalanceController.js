export class GetWalletBalanceController{
    constructor(dependencies){
        this.getWalletBalanceUseCase = new dependencies.useCase.GetWalletBalanceUseCase(dependencies)
    }
    async getWalletBalance(req,res,next){
        try {
            const {userId} = req.params
            console.log(userId);
            const getBalance = await this.getWalletBalanceUseCase.execute(userId)
            console.log("getBalance",getBalance);
            
            res.status(201).json({balance:getBalance})
        } catch (error) {
            console.error(error)
        }
    }
}