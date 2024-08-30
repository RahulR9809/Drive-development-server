export class GetMessageController{
    constructor(dependencies){
        this.getMessageUseCase = new dependencies.useCase.GetMessageUseCase(dependencies)
    }
    async getMessage(req,res,next){
        try {
            const {userId} = req.params
          const messages =   await this.getMessageUseCase.execute(userId)
          res.status(201).json({messages})
        } catch (error) {
            console.error(error)
        }
    }
}