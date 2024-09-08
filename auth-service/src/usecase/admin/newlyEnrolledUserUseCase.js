import {getDailyFilters } from '../../utils/dateFilters.js'
export class NewlyEnrolledUserUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(filter){
        try {
           if(filter == "Daily"){
            const currentTime = new Date()
            const dateRange =  getDailyFilters(currentTime)
              const result =   await this.driverRepository.sortDriversRegistrationByDate(dateRange)
                return result
           }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}