export class RideRequestController {
  constructor(dependencies) {
    this.requestRideUseCase = new dependencies.useCase.RideRequestUseCase(
      dependencies
    );
  }
  async requestRide(req, res, next) {
    try {
      const {
        userId,
        vehicleType,
        pickUpCoords,
        dropCoords,
        pickupLocation,
        dropLocation,
        distance,
        duration,
      } = req.body;

      if (
        !userId ||
        !vehicleType ||
        !pickUpCoords ||
        !dropCoords ||
        !pickupLocation ||
        !dropLocation ||
        !distance ||
        !duration
      ) {
        const error = new Error("Incomplete Request");
        error.status = 400;
        throw error;
      }
      const requestToDriver = await this.requestRideUseCase.execute(req.body);
      console.log('requestDriver=>',requestToDriver);
      res.status(200).json({message:"Request Processing"})
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
