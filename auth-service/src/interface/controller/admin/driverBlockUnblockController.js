export class DriverBlockUnblockController{
    constructor(dependencies){
        this.driverBlockUnblockUseCase = new dependencies.useCase.DriverBlockUnblockUseCase(dependencies)
    }
    async driverBlockUnblock(req,res,next){
        console.log(req.params);
        const {driverId} = req.params
        console.log('driverId',driverId);
     const manageDriver =  await this.driverBlockUnblockUseCase.execute(driverId)
     const data ={
        id:manageDriver._id,
        isBlocked:manageDriver?.isBlocked
     }
     res.status(200).json(data)
     
    }
}