export class SaveContactsController{
    constructor(dependencies){
        this.saveContactsUseCase = new dependencies.useCase.SaveContactsUseCase(dependencies)
    }
    async saveContacts(req,res,next){
        try {
            console.log(req.body);
            
          const saveEmergencyContacts =   await this.saveContactsUseCase.execute(req.body)
          console.log("saveEmergency",saveEmergencyContacts);
          res.status(201).json({userDetail:saveEmergencyContacts})
        } catch (error) {
            console.error(error)
        }
    }
}