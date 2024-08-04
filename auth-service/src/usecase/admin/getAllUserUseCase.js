export class GetAllUserUseCase{
    constructor(dependencies){
this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(){
     const allDrivers  = await this.userRepository.getAllUsers()
     return allDrivers
    }
}