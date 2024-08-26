export class GetMessageController{
    constructor(dependencies){
        this.getMessageUseCase = new dependencies.useCase.GetMessageUseCase(dependencies)
    }
    async getMessage(req,res,next){
        try {
            
          const messages =   await this.getMessageUseCase.execute(req.params.id)
          res.status(201).json({messages})
        } catch (error) {
            console.error(error)
        }
    }
}