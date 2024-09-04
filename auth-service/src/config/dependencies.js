import {
  GoogleAuthUseCase,
  userRefreshTokenUseCase,
  EmailAuthUseCase,
  VerifyOtpUseCase,
  ResendOtpUseCase,
  DriverRegisterUseCase,
  DriverLoginUseCase,
  DriverVerifyOtpUseCase,
  DriverCompleteProfileUseCase,
  DriverProfileUpdateUseCase,
  adminLoginUseCase,
  GetAllDriverUseCase,
  GetDriverDetailsUseCase,
  DriverApprovalUseCase,
  ApproveProfileUpdateUseCase,
  DriverBlockUnblockUseCase,
  UserBlockUnblockUseCase,
  GetAllUserUseCase,
  UpdateUserDataUseCase,
  DriverRefreshTokenUseCase,
  AdminRefreshTokenUseCase,
  SaveContactsUseCase
} from "../usecase/index.js";
import { MongoUserRepository,MongoDriverRepository, MongoAdminRepository } from "../interface/repository/index.js";

const useCase = {
  GoogleAuthUseCase,
  EmailAuthUseCase,
  VerifyOtpUseCase,
  userRefreshTokenUseCase,
  ResendOtpUseCase,

  DriverRegisterUseCase,
  DriverLoginUseCase,
  DriverCompleteProfileUseCase,
  DriverVerifyOtpUseCase,
  DriverProfileUpdateUseCase,
  DriverRefreshTokenUseCase,

  adminLoginUseCase,
  AdminRefreshTokenUseCase,
  GetAllDriverUseCase,
  GetDriverDetailsUseCase,
  DriverApprovalUseCase,
  ApproveProfileUpdateUseCase,
  DriverBlockUnblockUseCase,
  UserBlockUnblockUseCase,
  GetAllUserUseCase,
  UpdateUserDataUseCase,
  SaveContactsUseCase
};

const repository = {
  MongoUserRepository,
  MongoDriverRepository,
  MongoAdminRepository
};

export const dependencies = {
  useCase,
  repository,
};
