
export class GetAllUserController{
    constructor(dependencies){
        this.getAllUserUseCase = new dependencies.useCase.GetAllUserUseCase(dependencies)
    }
    async getAllDrivers(req,res,next){
        try {
            console.log('entry');
            const getAllUsers =  await this.getAllUserUseCase.execute()
            console.log('get',getAllUsers);
            res.status(200).json({userDetails:getAllUsers})
        } catch (error) {
            console.error(error)
        }
    }
}