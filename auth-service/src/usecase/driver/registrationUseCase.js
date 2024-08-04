import { hash } from "../../utils/hash.js";
import sendMail from "../../utils/nodemailer.js";
export class DriverRegisterUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository(
      dependencies
    );
  }
  async execute(registerDetails) {
    try {
      const { name, email, phone, password } = registerDetails;
      if (name && email && phone && password) {
        //check whether there is existing user from db
        const findUserByEmail = await this.driverRepository.findDriverByEmail(email);

        if (!findUserByEmail) {
          //Hash the Password
          const hashedPassword = await hash(password);
          //create OTP with Math.floor
          const otp = Math.floor(1000 + Math.random() * 9000).toString()
          console.log('Driver--OTP',otp);
          //SendMail to the Driver
          await sendMail(otp, email);
          const dataToInsert = {
            name,
            email,
            phone,
            password: hashedPassword,
            license_Number: "nill",
            license_Img: "nill",
            vehicleDetails: {
              vehicle_type: "nill",
              rc_Number: "nill",
              permit: "nill",
            },
            wallet: 0,
          };
          const createUser = await this.driverRepository.createDriver(
            dataToInsert
          );
          return {
            userId: createUser._id,
            otp
          };
        } else {
          const error = new Error();
          error.status = 409; //conflict driver Already exist
          error.message = "Driver with Same Email Already Exist";
          throw error;
        }
      } else {
        const error = new Error();
        error.status = 400;
        error.message = "Fill the Required Fields";
        throw error;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
