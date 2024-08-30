import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase,
  StripePaymentUseCase,
  CashOnDeliveryUseCase,
  GetTripDetailsUseCase,
  GetTripDetailByIdUseCase

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
  StripePaymentUseCase,
  CashOnDeliveryUseCase,
  GetTripDetailsUseCase,
  GetTripDetailByIdUseCase
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
