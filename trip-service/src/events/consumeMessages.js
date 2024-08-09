import { dependencies } from "../config/dependencies.js"
import { UserCreatedConsumeController } from "../interface/controllers/consumeController/userCreatedController.js"
import { UserUpdateController } from "../interface/controllers/consumeController/userUpdateController.js"

export class consumeManager{
    constructor(){
        this.consumeUserCreatedController = new UserCreatedConsumeController(dependencies)
        this.consumeUpdateUserController = new UserUpdateController(dependencies)
    }
    async consumer({type,value}){
        try {
            console.log('entry');
            const data = JSON.parse(value)
            console.log('value',data);
            
            switch(type){
                case 'USER_CREATED' : 
                await this.consumeUserCreatedController.createUser(data)
                case 'USER_UPDATED' :
                    await this.consumeUpdateUserController.updateUser(data)
                default:
                    const error = new Error('No Type mentioned')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}