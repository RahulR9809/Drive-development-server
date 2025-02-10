export class GetAllTripsController {
    constructor(dependencies) {
      this.getAllTripsUseCase = new dependencies.useCase.GetAlltripsUseCase(
        dependencies
      );
    }
    async getDriversTrips(req, res, next) {
      try {
        const { driverId,  } = req.query;
        if (!driverId ) {
          const error = new Error();
          error.message = "Bad Request";
          error.status = 400;
          throw error;
        }
        const GetTripHistoryUseCase = await this.getAllTripsUseCase.execute(
          driverId
        );
        res.status(201).json({
          tripDetails: GetTripHistoryUseCase?.tripDetails,
          totalDocs: GetTripHistoryUseCase?.getDriversTotalTripCount,
        });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  }
  