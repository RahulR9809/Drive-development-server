import { UserCreatedConsumerUseCase,UserUpdateUseCase,DriverCreatedConsumerUseCase,DriverUpdateConsumerUseCase} from '../usecase/index.js'
import {MongoAdminRepository,MongoUserRepository,MongoDriverRepository,} from '../interface/repository/index.js'

const useCase = {
    UserCreatedConsumerUseCase,
    UserUpdateUseCase,
    DriverCreatedConsumerUseCase,
    DriverUpdateConsumerUseCase
}

const repository = {
    MongoAdminRepository,
    MongoDriverRepository,
    MongoUserRepository
}

export const dependencies = {
    useCase,
    repository
}


   