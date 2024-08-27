import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase,
  StripePaymentUseCase

} from "../usecase/index.js";
import { 
  MongoAdminRepository,
  MongoUserRepository,
  MongoDriverRepository,
  MongoTripRepository,
  MongoPaymentRepository
} from "../interface/repository/index.js";

const useCase = {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase  ,
  StripePaymentUseCase
};

const repository = {
  MongoAdminRepository,
  MongoDriverRepository,
  MongoUserRepository,
  MongoTripRepository,
  MongoPaymentRepository
};

export const dependencies = {
  useCase,
  repository,
};
