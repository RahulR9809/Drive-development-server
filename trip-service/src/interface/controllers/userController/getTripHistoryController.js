export class GetTripHistoryController {
  constructor(dependencies) {
    this.getTripHistoryUseCase = new dependencies.useCase.GetTripHistoryUseCase(
      dependencies
    );
  }
  async getTripHistory(req, res, next) {
    try {
      const { userId } = req.params;
      const getTripDetails = await this.getTripHistoryUseCase.execute(userId);
      res
        .status(201)
        .json({
          getTripDetails: getTripDetails?.getTripHistoryByUserId,
          docsCount: getTripDetails?.getTripCountPerUser,
        });
    } catch (error) {
      console.error(error);
    }
  }
}
