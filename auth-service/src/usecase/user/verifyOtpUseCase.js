import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";
export class VerifyOtpUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(sessionData, enteredOtp) {
    try {
      const awsS3Config = new S3Config();
      if (!sessionData) {
        const error = new Error();
        error.status = 400;
        error.message = "Otp Expired";
        throw error;
      }
      const { userId, otp } = sessionData;
      const user = await this.userRepository.findUserById(userId);
      if (user?.isBlocked) {
        const error = new Error();
        error.status = 403;
        error.message = "You are Blocked by the Admin";
        throw error;
      }
      if (otp !== enteredOtp) {
        const error = new Error();
        error.status = 400;
        error.message = "Otp is not matching";
        throw error;
      }
      const updateVerificationStatus = { isVerified: true };
      const verifyUser = await this.userRepository.findByIdUpdate(
        userId,
        updateVerificationStatus
      );

      let getImageUrl;
      if (verifyUser.profileImg) {
        const getImageFromS3 = await awsS3Config.getImageUrl({
          imgField: "ProfileImg",
          Key: verifyUser?.profileImg,
        });
        console.log("getImg", getImageFromS3);
        getImageUrl = getImageFromS3?.url;
      }

      const data = {
        id: verifyUser._id,
        name: verifyUser.name,
        email: verifyUser.email,
        phone: verifyUser.phone,
        isVerified: true,
        isBlocked: verifyUser.isBlocked,
        profileUrl: getImageUrl ? getImageUrl : "",
      };
      const accessToken = await createAccessToken({
        ...data,
        role: "USER",
      });
      const refreshToken = await createRefreshToken({
        ...data,
        role: "USER",
      });
      return {
        data,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }
}
