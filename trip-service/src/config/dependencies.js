import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  UserCurrentLocationUseCase,
  LocationAutoCompleteUseCase,
  GetDriverOnlineUseCase,
  GetNearByDriverUseCase,
  RideRequestUseCase,
  GetAdditionalTripDataUseCase,
  AcceptRideUseCase,
  RejectRideUseCase,
  StartRideUseCase,
  // RideCompleteUseCase,
  GetDriverOfflineUseCase,
  CompleteRideUseCase,
  ReverseGeoCodeUseCase,
  ChangePaymentUseCase,
  EmergencyAlertUseCase,
  CancelRideUseCase,
  TripCountUseCase,
  GetTripHistoryUseCase
  
} from "../usecase/index.js";
import { 
  MongoAdminRepository,
  MongoUserRepository,
  MongoDriverRepository,
  MongoTripRepository
} from "../interface/repository/index.js";

const useCase = {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  UserCurrentLocationUseCase,
  LocationAutoCompleteUseCase,
  GetDriverOnlineUseCase,
  GetNearByDriverUseCase,
  RideRequestUseCase,
  GetAdditionalTripDataUseCase,
  AcceptRideUseCase,
  RejectRideUseCase,
  StartRideUseCase,
  GetDriverOfflineUseCase,
  CompleteRideUseCase,
  ReverseGeoCodeUseCase,
  ChangePaymentUseCase,
  EmergencyAlertUseCase,
  CancelRideUseCase,
  TripCountUseCase,
  GetTripHistoryUseCase
};

const repository = {
  MongoAdminRepository,
  MongoDriverRepository,
  MongoUserRepository,
  MongoTripRepository
};

export const dependencies = {
  useCase,
  repository,
};
