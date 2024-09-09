export class CancelRideController{
    constructor(dependencies){
        this.cancelRideUseCase = new dependencies.useCase.CancelRideUseCase(dependencies)
    }
    async cancelRide(req,res,next){
        try {
        const cancelDetails =     await this.cancelRideUseCase.execute(req.body)
        console.log("camcer",cancelDetails);
        
        res.status(201).json({cancelDetails:cancelDetails,status:"cancelled"})
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}