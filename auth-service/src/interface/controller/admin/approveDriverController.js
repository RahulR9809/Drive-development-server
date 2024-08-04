export class ApproveDriverController{
    constructor(dependencies){
        this.driverApproveUseCase = new dependencies.useCase.DriverApprovalUseCase(dependencies)
    }
    async approve(req,res,next){
        try {
            console.log('approovadkdkj');
            const {driverId} = req.params
              const driverApproval =   await this.driverApproveUseCase.execute(driverId)
              res.status(200).json({message:'Driver has been Approved'})
        } catch (error) {
            console.error(error)
        }
    }
}