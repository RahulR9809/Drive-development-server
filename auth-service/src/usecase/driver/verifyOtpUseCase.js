import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
export class DriverVerifyOtpUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(sessionData, enteredOtp) {
    try {
      if (sessionData) {
        const {userId,otp} = sessionData
        const user = await this.driverRepository.findDriverbyId(userId);

        if (!user?.isBlocked) {
          if (otp === enteredOtp) {
            const updateVerificationStatus = { isVerified: true };
            const verifyUser = await this.driverRepository.findDriverByIdAndUpdate(
              userId,
              updateVerificationStatus
            );
            console.log("verifyuser", verifyUser);
            const data = {
              id: verifyUser?._id,
              name: verifyUser?.name,
              email: verifyUser?.email,
              phone: verifyUser?.phone,
              isVerified: true,
              isBlocked:verifyUser?.isBlocked,
              isProfileComplete:verifyUser?.isProfileComplete,
              isAccepted:verifyUser?.isAccepted,
              editRequest:verifyUser?.editRequest
            };
            return {
              data
            };
          } else {
            const error = new Error()
            error.message = 'Otp Mismatch'
            error.status = 401
          throw error

          }
        } else {
          console.log("User is being Blocked by the Admin");
          const error = new Error();
          error.status = 403;
          error.message = "You are Blocked by the Admin";
          throw error
        }
      } else {
      
        const error = new Error()
        error.status = 401;
        error.message = 'Otp Expired'
        throw error
      }
    } catch (err) {
      throw err;
    }
  }
}
