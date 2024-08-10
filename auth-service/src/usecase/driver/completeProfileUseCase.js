
import { DRIVER_UPDATED, TOPIC } from "../../events/config.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";
export class CompleteProfileUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.kafka = new KafkaClient()
  }
  async execute(body, files) {

    //Getting details from Request Body

    const { licenseNumber, vehicleType, vehicleRC, driverId } = body;
    console.log('body obj',body);
    
    if(!licenseNumber || !vehicleType || !vehicleRC || !driverId){
        const error = new Error()
        error.message('Fill all the Fields')
        error.status(400)
        throw error
    }

    const s3Instance = new S3Config();

    //waiting until the images are uploaded into S3 Bucket

    const uploadResults = await Promise.all(
      files.map((img) => {
        return s3Instance.uploadImage(img);
      })
    );
    console.log("uploads", uploadResults);
    
    let driverLicenseImg, driverProfileImg, driverPermit;
    for (const imgData of uploadResults) {
      if (imgData.imgField === "licensePhoto") {
        driverLicenseImg = imgData.Key;
      } else if (imgData.imgField === "ProfileImg") {
        driverProfileImg = imgData.Key;
      } else if (imgData.imgField === "permit") {
        driverPermit = imgData.Key;
      }

    }
    const detailsToInsert = {
      license_Number:licenseNumber ,
      license_Img : driverLicenseImg,
      profileImg: driverProfileImg,
      vehicleDetails:{
        vehicle_type:vehicleType,
        rc_Number:vehicleRC,
        permit:driverPermit
      },
      isProfileComplete:true
    }
    console.log(driverId);
    console.log('after Body',driverId);
 
    

  const updateDriverProfile  = await this.driverRepository.findDriverByIdAndUpdate(driverId,detailsToInsert)
 
  const dataToPublish = {
    _id:updateDriverProfile._id,
    license_Number:updateDriverProfile.license_Number ,
    license_Img :updateDriverProfile.license_Img,
    profileImg:updateDriverProfile.profileImg,
    vehicleDetails:{
      vehicle_type:updateDriverProfile?.vehicleDetails?.vehicle_type,
      rc_Number:updateDriverProfile?.vehicleDetails?.rc_Number,
      permit:updateDriverProfile?.vehicleDetails?.permit
    },
    isProfileComplete:updateDriverProfile?.isProfileComplete
  }
  console.log('dataToPublish',dataToPublish);
  
  
  this.kafka.produceMessage(TOPIC,{
    type:DRIVER_UPDATED,
    value:JSON.stringify(dataToPublish)
  })
      const imageUrl = await Promise.all(
        uploadResults.map((img) => {
          return s3Instance.getImageUrl(img);
        })
      );
      console.log(imageUrl);
      let licenseUrl, profileUrl, permitUrl;
      for (const img of imageUrl) {
        if (img.key === "licensePhoto") {
            licenseUrl = img.url;
        }else if(img.key === 'ProfileImg' ){

          profileUrl =  img.url
        }else if(img.key === 'permit'){

          permitUrl = img.url
        }
      }

      

      return {
        id: updateDriverProfile._id,
        name: updateDriverProfile.name,
        email: updateDriverProfile.email,
        phone: updateDriverProfile.phone,
        licenseNumber: updateDriverProfile?.license_Number,
        vehicleType: updateDriverProfile?.vehicleDetails?.vehicle_type,
        rc_Number: updateDriverProfile?.vehicleDetails?.rc_Number,
        isProfileComplete:updateDriverProfile.isProfileComplete,
        licenseUrl,
        profileUrl,
        permitUrl,
        isBlocked:updateDriverProfile?.isBlocked,
        isVerified:updateDriverProfile?.isVerified,
        isAccepted:updateDriverProfile?.isAccepted,
        editRequest:updateDriverProfile?.editRequest
      };
    }
  }

