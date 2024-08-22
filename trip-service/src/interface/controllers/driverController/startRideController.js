export class StartRideController{
    constructor(dependencies){
this.startRideUseCase = new dependencies.useCase.StartRideUseCase(dependencies) 
    }
    async startRide(req,res,next){
        try {
            const  {tripOtp,tripId} = req.body
            const {otp} = req.session
            await this.startRideUseCase.execute(tripOtp,otp,tripId)
            res.status(200).json({message:'Ride started SucessFully'})
        } catch (error) {
            console.error(error);
        }
    }
}