export class GetWalletHistoryController{
    constructor(dependencies){
this.getWalletHistoryUseCase = new dependencies.useCase.GetWalletHistoryUseCase(dependencies)
    }
    async getWalletHistory(req,res,next){
        try {
            const {userId} = req.params
            console.log(userId);
         const getHistory = await this.getWalletHistoryUseCase.execute(userId)
         res.status(201).json({getHistory})
            
        } catch (error) {
            console.error(error)
        }
    }
}