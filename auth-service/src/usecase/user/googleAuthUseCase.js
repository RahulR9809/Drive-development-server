import axios from "axios";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
export class GoogleAuthUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(token) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const { email, email_verified, name } = response.data;
      const isUserExist = await this.userRepository.findUserByEmail(email);
      let data;
      if (isUserExist) {
        if (isUserExist.isBlocked) {
          console.log("you are blocked by admin");
          const error = new Error();
          error.status = 403;
          error.message = "You are Currently blocked by the Admin";
          throw error;
        }
        data = {
          id: isUserExist._id,
          name: isUserExist.name,
          email: isUserExist.email,
          phone: isUserExist.phone,
          isBlocked: isUserExist.isBlocked,
          isVerified: isUserExist.isVerified,
          isProfileComplete: isUserExist.isProfileComplete,
        };
      } else {
        const userDataToInsert = {
          name,
          email,
          phone: 0,
          authType: "GOOGLE_AUTH",
          isVerified: email_verified,
        };
        if (!userDataToInsert.isVerified) {
          const error = new Error();
          error.status = 400;
          error.message = "Your Google Account is not Verified";
          throw error;
        }
        const userCreated = await this.userRepository.createUser(
          userDataToInsert
        );
        data = {
          id: userCreated._id,
          name: userCreated.name,
          email: userCreated.email,
          phone: userCreated.phone,
          isBlocked: userCreated.isBlocked,
          isVerified: userCreated.isVerified,
          isProfileComplete: userCreated.isProfileComplete,
        };
      }

      const accessToken = await createAccessToken({ ...data, role: "USER" });
      const refreshToken = await createRefreshToken({ ...data, role: "USER" });

      return {
        data,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
