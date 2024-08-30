export class GetTripDetailByIdController{
    constructor(dependencies){
        this.getTripDetailUseCase = new dependencies.useCase.GetTripDetailByIdUseCase(dependencies)
    }
    async getTripDetailById(req,res,next){
        try {
            const {tripId} = req.params
         const getTripDetail =   await this.getTripDetailUseCase.execute(tripId)
         res.status(201).json({getTripDetail})
        } catch (error) {
            console.error(error)
        }
    }
}