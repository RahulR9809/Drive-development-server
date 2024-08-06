export class GetAllUserController {
  constructor(dependencies) {
    this.getAllUserUseCase = new dependencies.useCase.GetAllUserUseCase(
      dependencies
    );
  }
  async getAllUsers(req, res, next) {
    try {
      const { search, page } = req.query;
      console.log(search, page);
      if (!search && !page) {
        console.log("hello guys");
        const getUsers =await this.getAllUserUseCase.execute();
        console.log(getUsers);
        
        res
          .status(201)
          .json({
            userDetails: getUsers.allUsers,
            totalPages: getUsers.totalPages,
          });
      } else if (search || page) {
        const getUsers =await  this.getAllUserUseCase.execute(search, page);
        console.log(getUsers);
        res
          .status(201)
          .json({
            userDetails: getUsers.allUsers,
            totalPages: getUsers.totalPages,
          });
      }
    } catch (error) {
      console.error(error); 
      next(error)
    }
  }
}
