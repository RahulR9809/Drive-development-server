export class RideCompleteController {
  constructor(dependencies) {
    this.rideCompleteUseCase = new dependencies.useCase.RideCompleteUseCase(
      dependencies
    );
  }
  async completeRide(req, res, next) {
    const { tripId } = req.body;
    await this.rideCompleteUseCase.execute(tripId);
  }
}
