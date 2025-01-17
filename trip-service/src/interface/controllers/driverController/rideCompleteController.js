export class RideCompleteController {
  constructor(dependencies) {
    this.rideCompleteUseCase = new dependencies.useCase.CompleteRideUseCase(
      dependencies
    );
  }
  async completeRide(req, res, next) {

    const { tripId,userId } = req.body;
  const updateRideStatus_CompleteRide =    await this.rideCompleteUseCase.execute(tripId,userId);
  console.log("ridecompletecontroller");
  
  res.status(200).json({message:"Ride Completed SuccessFully"})
    
  }
}
