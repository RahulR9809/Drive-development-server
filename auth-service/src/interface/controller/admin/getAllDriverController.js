
export class GetAllDriverControllers{
    constructor(dependencies){
        this.getAllDriverUseCase = new dependencies.useCase.GetAllDriverUseCase(dependencies)
    }
    async getAllDrivers(req,res,next){
        try {
            const getAllDrivers =  await this.getAllDriverUseCase.execute()
            console.log('get',getAllDrivers);
            res.status(200).json({driverDetails:getAllDrivers})
        } catch (error) {
            console.error(error)
        }
    }
}