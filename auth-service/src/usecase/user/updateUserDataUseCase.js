import { S3Config } from "../../utils/s3-bucketConfig.js";
export class UpdateUserDataUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(body, file) {
    const awsS3Config = new S3Config();
    let dataToUpdate;
    if (file == undefined) {
      dataToUpdate = {
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
      };
      const userProfileUpdate = await this.userRepository.findByIdUpdate(
        body.userId,
        dataToUpdate
      );
      const imgUrlFromS3 = await awsS3Config.getImageUrl({
        imgField: "profileImg",
        Key: userProfileUpdate?.profileImg,
      });
      console.log("url", imgUrlFromS3);
      return {
        id: userProfileUpdate?._id,
        name: userProfileUpdate?.name,
        email: userProfileUpdate?.email,
        phone: userProfileUpdate?.phone,
        isBlocked: userProfileUpdate?.isBlocked,
        profileUrl: imgUrlFromS3.url,
      };
    } else {
      const uploadedImg = await awsS3Config.uploadImage(file);
      const s3UploadedImg = uploadedImg.Key;
      console.log(uploadedImg);
      dataToUpdate = {
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
        profileImg: s3UploadedImg,
      };
      const userProfileUpdate = await this.userRepository.findByIdUpdate(
        body.userId,
        dataToUpdate
      );
      const imgUrlFromS3 = await awsS3Config.getImageUrl({
        imgField: "profileImg",
        Key: userProfileUpdate?.profileImg,
      });
      console.log("url", imgUrlFromS3);
      return {
        id: userProfileUpdate?._id,
        name: userProfileUpdate?.name,
        email: userProfileUpdate?.email,
        phone: userProfileUpdate?.phone,
        isBlocked: userProfileUpdate?.isBlocked,
        profileUrl: imgUrlFromS3?.url ? imgUrlFromS3?.url:"",
      };
    }
  }
}
