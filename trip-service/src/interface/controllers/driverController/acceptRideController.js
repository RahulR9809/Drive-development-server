export class AcceptRideController{
    constructor(dependencies){
this.acceptRideUseCase  = new dependencies.useCase.AcceptRideUseCase(dependencies)
    }
    async acceptRide(req,res,next){
        try {
            console.log('reqbody in Accept',req.body);
            
            const {tripId,driverId,status} = req.body
          const acceptRide =   await this.acceptRideUseCase.execute(tripId,driverId,status)
          req.session.otp = acceptRide?.otp
          res.status(201).json({acceptRide:acceptRide?.acceptRequest})
            
        } catch (error) {
            console.error(error);
            
        }
        
    }
}