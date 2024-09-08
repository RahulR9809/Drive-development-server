export class NewlyEnrolledUserController{
    constructor(dependencies){
        this.newlyEnrolledUserUseCase = new dependencies.useCase.NewlyEnrolledUserUseCase(dependencies)
    }
    async newlyEnrolledUsers(req,res,next){
        try {
            const {filter} = req.params
          const getNewUsersReport = await this.newlyEnrolledUserUseCase.execute(filter)
          console.log("jjj",getNewUsersReport);
          
          res.status(201).json({usersData:getNewUsersReport})
        } catch (error) {
            console.error(error);
            next(error)
            
        }
    }
}