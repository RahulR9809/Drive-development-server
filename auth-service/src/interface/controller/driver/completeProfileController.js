export class CompleteProfileController{
    constructor(dependencies){
        this.completeProfileUseCase = new dependencies.useCase.DriverCompleteProfileUseCase(dependencies)
    }
    async completeProfile(req,res,next){
      const userDetails =   await this.completeProfileUseCase.execute(req.body,req.files)
      console.log('userDetails',userDetails); 
        res.status(200).json({data:userDetails,message:'You have completed your profile successfully'})
    }
}