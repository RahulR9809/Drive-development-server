export class StartRideController{
    constructor(dependencies){
this.startRideUseCase = new dependencies.useCase.StartRideUseCase(dependencies) 
    }
    async startRide(req,res,next){
        try {
            const  {tripOtp,tripId} = req.body
            const {otp} = req.session
            console.log('sesess',req.session);
            
            console.log('before usecase=========>');
            
          const updatedTrip =   await this.startRideUseCase.execute(tripOtp,otp,tripId)
            res.status(200).json({tripDetail:updatedTrip , message:'Ride started SucessFully'})
        } catch (error) {
            console.error(error);
        }
    }
}