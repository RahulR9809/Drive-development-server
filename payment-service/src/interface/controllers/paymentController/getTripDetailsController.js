export class GetTripDetailsController{
    constructor(dependencies){
        this.getTripUseCase = new dependencies.useCase.GetTripDetailsUseCase(dependencies)
    }
    async getTripDetails(req,res,next){
        try {
            const {userId} = req.params
      const  getTripDetails  =  await this.getTripUseCase.execute(userId)
      res.status(201).json({getTripDetails})
        } catch (error) {
            console.error(error);
            
        }
    }
}