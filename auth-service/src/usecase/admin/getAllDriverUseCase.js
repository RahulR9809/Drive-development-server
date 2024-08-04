export class GetAllDriverUseCase{
    constructor(dependencies){
this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(){
     const allDrivers  = await this.driverRepository.getAllDrivers()
     return allDrivers
    }
}