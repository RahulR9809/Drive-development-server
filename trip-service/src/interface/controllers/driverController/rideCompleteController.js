export class RideCompleteController {
  constructor(dependencies) {
    this.rideCompleteUseCase = new dependencies.useCase.CompleteRideUseCase(
      dependencies
    );
  }
  async completeRide(req, res, next) {
    console.log("complete Ride ")
    const { tripId,userId } = req.body;
    console.log("iddddddddddddddddd,",tripId,userId);
    
    console.log("inside the rideeeeeeeeeeeeeeeeeeeee"); 
    
  const updateRideStatus_CompleteRide =    await this.rideCompleteUseCase.execute(tripId,userId);
  console.log("ridecompletecontroller");
  
  res.status(200).json({message:"Ride Completed SuccessFully"})
    
  }
}
