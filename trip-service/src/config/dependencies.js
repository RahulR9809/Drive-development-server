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
  GetTripHistoryUseCase,
  TopTripUseCase,
  CompletedTripCountUseCase,
  GetLatestTripsUseCase,
  GetAllLatestTripsUseCase,
  MostActiveDriverUseCase,
  TotalTripsCountUseCase,
  GetAlltripsUseCase
  
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
  GetTripHistoryUseCase,
  TopTripUseCase,
  CompletedTripCountUseCase,
  GetLatestTripsUseCase,
  GetAllLatestTripsUseCase,
  MostActiveDriverUseCase,
  TotalTripsCountUseCase,
  GetAlltripsUseCase
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
