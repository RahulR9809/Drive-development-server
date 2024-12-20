import axios from "axios";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC ,USER_CREATED } from "../../events/config.js";
export class GoogleAuthUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.kafka = new KafkaClient()
  }
  async execute(token) {
    try {
      const googleAuthResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const { email, email_verified, name } = googleAuthResponse.data;
      console.log('level1');
      
      const isUserExist = await this.userRepository.findUserByEmail(email);
      console.log('level2',isUserExist);

      let data;
      if (isUserExist) {
        if (isUserExist.isBlocked) {
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
        console.log('inside else ');
        
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
        console.log('usercreated',userCreated);
        
        data = {
          id: userCreated._id,
          name: userCreated.name,
          email: userCreated.email,
          phone: userCreated.phone,
          isBlocked: userCreated.isBlocked,
          isVerified: userCreated.isVerified,
          isProfileComplete: userCreated.isProfileComplete,
        };
        console.log(userCreated);
        
        const userDatatoPublish = {
          _id:userCreated._id,
          name:userCreated.name,
          email: userCreated.email,
          phone: userCreated.phone,
          isBlocked: userCreated.isBlocked,
          isVerified: userCreated.isVerified,
          isProfileComplete: userCreated.isProfileComplete,
          authType:userCreated.authType,
          createdAt:userCreated.createdAt,
          profileImg:userCreated.profileImg
        }
        console.log('userdatat===========>',userDatatoPublish);
        
        this.kafka.produceMessage(TOPIC,{
          type:USER_CREATED,
          value: JSON.stringify(userDatatoPublish)
        })
        
      }

      const accessToken = await createAccessToken({ ...data, role: "USER" });
      const refreshToken = await createRefreshToken({ ...data, role: "USER" });

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
