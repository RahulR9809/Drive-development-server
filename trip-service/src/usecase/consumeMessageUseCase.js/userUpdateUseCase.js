export class UserUpdateUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(id,data){
        try {
            console.log('user Updated UseCase');
            console.log('userid',id,data);
       const result =    await  this.userRepository.findByIdUpdate(id,data)
       console.log('hjdk',result);
       
        } catch (error) {
            console.log(error);
            
        }
    
    }
}