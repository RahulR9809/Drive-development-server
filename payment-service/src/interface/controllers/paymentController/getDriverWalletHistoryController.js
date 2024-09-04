export class GetDriverWalletHistoryController{
    constructor(dependencies){
this.getDriverWalletHistoryUseCase = new dependencies.useCase.GetDriverWalletHistoryUseCase(dependencies)
    }
    async getDriverWalletHistory(req,res,next){
        try {
            const {driverId} = req.params
            console.log(driverId);
         const getDriverHistory = await this.getWalletHistoryUseCase.execute(driverId)
         res.status(201).json({getDriverHistory})
            
        } catch (error) {
            console.error(error)
        }
    }
}