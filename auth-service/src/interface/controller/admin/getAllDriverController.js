export class GetAllDriverControllers {
  constructor(dependencies) {
    this.getAllDriverUseCase = new dependencies.useCase.GetAllDriverUseCase(
      dependencies
    );
  }
  async getAllDrivers(req, res, next) {
    try {
      // const getAllDrivers =  await this.getAllDriverUseCase.execute()
      // console.log('get',getAllDrivers);
      // res.status(200).json({driverDetails:getAllDrivers})
      const { search, page } = req.query;
      console.log(search, page);
      if (!search && !page) {
        console.log("hello guys");
        const getUsers = await this.getAllDriverUseCase.execute();
        console.log(getUsers);

        res.status(201).json({
          driverDetails: getUsers.allDrivers,
          totalPages: getUsers.totalPages,
        });
      } else if (search || page) {
        const getUsers = await this.getAllDriverUseCase.execute(search,page);
        console.log(getUsers);
        res.status(201).json({
          driverDetails: getUsers.allDrivers,
          totalPages: getUsers.totalPages,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
