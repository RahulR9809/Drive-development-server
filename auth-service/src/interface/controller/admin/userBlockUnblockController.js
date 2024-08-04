export class UserBlockUnblockController{
    constructor(dependencies){
        this.userBlockUnblockUseCase = new dependencies.useCase.UserBlockUnblockUseCase(dependencies)
    }
    async userBlockUnblock(req,res,next){
        console.log('ethi');
        const {userId} = req.params
        console.log(userId);
     const manageUser =  await this.userBlockUnblockUseCase.execute(userId)
     const data ={
        id:manageUser._id,
        isBlocked:manageUser?.isBlocked
     }
     res.status(200).json(data)
     
    }
}