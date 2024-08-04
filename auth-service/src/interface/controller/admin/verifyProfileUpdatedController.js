export class verifyProfileUpdateController {
    constructor(dependencies){
        this.approveProfileUpdate = new dependencies.useCase.ApproveProfileUpdateUseCase(dependencies)
    }
    async profileUpdateManage(req,res,next){
        try {
            console.log('kumbufu');
        const {driverId,status} = req.params
        console.log(req.params);
        if(status == 'approval'){
            console.log('app');
       const approveProfileUpdate  =  await this.approveProfileUpdate.execute(driverId)
       res.status(200).json({message:'Approve Profile Update request'})
        }else if(status == 'reject'){
            const rejectProfileUpdate = await this.approveProfileUpdate.execute(driverId)
            res.status(200).json({message:'Reject Profile Update request'})
        }
   
        } catch (error) {
            console.error(error);
        }


    }

}