export class RejectRideController{
    constructor(dependencies){
        this.rejectRideUseCase = new dependencies.useCase.RejectRideUseCase(dependencies)
    }
    async rejectRide(req,res,next){
        try {
            const {driverId,status} = req.body
            await this.rejectRideUseCase.execute(driverId,status)
        } catch (error) {
            
        }
    }
}