export class UserUpdateController{
    constructor(dependencies){
        this.userUpdateUseCase = new dependencies.useCase.UserUpdateUseCase(dependencies)
    }
    async updateUser(data){
        try {
            const id = data?._id
            await this.userUpdateUseCase.execute(id,data)
        } catch (error) {
            console.log(error);
            
        }
    }
}