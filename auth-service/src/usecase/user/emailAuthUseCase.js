import sendMail from "../../utils/nodemailer.js";
import generateOTP from "../../utils/generateOtp.js";
export class EmailAuthUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(email) {
    try {
      const findUserByEmailId = await this.userRepository.findUserByEmail(
        email
      );
      let userId;
      if (!findUserByEmailId) { 
        const detailsToStore = {
          name: email.split("@")[0],
          email: email,
          phone: 0,
        };
        const createUserByEmailAuth = await this.userRepository.createUser(
          detailsToStore
        );
        userId = createUserByEmailAuth._id;
      } else {
        userId = findUserByEmailId._id;
      }
      // const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otp = generateOTP()
       await sendMail(otp, email);
       console.log('otp=====',otp);
      return {
        userId,
        otp,
      };
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
