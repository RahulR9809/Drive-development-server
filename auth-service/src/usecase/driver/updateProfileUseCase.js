
import { S3Config } from "../../utils/s3-bucketConfig.js";

export class DriverProfileUpdateUseCase{
    constructor(dependencies){
this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(body,files){
        try {
        console.log(body,files);
        const {name,email,phone,licenseNumber,vehicleType,vehicleRC,driverId} = body
        let dataToUpdate 
        if((files.length == 0)){
            dataToUpdate={
                name,
                email,
                phone,
                licenseNumber,
                vehicleDetails:{
                    vehicle_type:vehicleType,
                    rc_Number:vehicleRC,
                },
                isVerified:false,
                editRequest:true
            }
        }else{
          const imageDetails = {}
          const awsConfig = new S3Config()
       const uploadResults = await Promise.all(files.map((img)=>{
            return awsConfig.uploadImage(img)
          }))
          console.log('uplooad',uploadResults);
          for(const img of uploadResults){
            if(img.imgField == 'profileImg'){
                imageDetails['profileImg'] = img.Key
            }else if(img.imgField == 'licenseImg'){
                imageDetails['licenseImg'] =img.Key
            }else if(img.imgField == 'permitImg') {
                imageDetails['permitImg'] = img.Key
            }
          }
          console.log('imgDetails',imageDetails)

          console.log(imageDetails);
          dataToUpdate = {
                name,
                email,
                phone,
                licenseNumber,
                license_Img:imageDetails.licenseImg && imageDetails.licenseImg,
                vehicleDetails:{
                    vehicle_type:vehicleType,
                    rc_Number:vehicleRC,
                    permit:imageDetails.permitImg && imageDetails.permitImg 
                },
                profileImg:imageDetails?.profileImg && imageDetails?.profileImg ,
                isVerified:false,
                editRequest:true
          }
        }
        console.log('wwwww',dataToUpdate);
    const updatedDetails = await this.driverRepository.findDriverByIdAndUpdate(driverId,dataToUpdate)
    console.log('updatedededed',updatedDetails);
    const data  =  {
        // id: updatedDetails._id,
        // name: updatedDetails.name,
        // email: updatedDetails.email,
        // phone: updatedDetails.phone,
        // licenseNumber: updatedDetails?.license_Number,
        // vehicleType: updatedDetails?.vehicleDetails?.vehicle_type,
        // rc_Number: updatedDetails?.vehicleDetails?.rc_Number,
        // isProfileComplete:updatedDetails.isProfileComplete,
        // licenseUrl,
        // profileUrl,
        // permitUrl,
        isBlocked:updatedDetails?.isBlocked,
        isVerified:updatedDetails?.isVerified,
        isAccepted:updatedDetails?.isAccepted,
        editRequest:updatedDetails?.editRequest,
    }
console.log('data',data);
return data
            
        } catch (error) {
            
        }
    }
}