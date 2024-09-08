import { driverModel } from "../../database/schema/driverSchema/driverSchema.js";
export class DriverRepository {
  constructor() {}
  async createDriver(driverDetails) {
    try {
      const driver = new driverModel(driverDetails);
      return driver.save();
    } catch (error) {
      console.error(error);
    }
  }
  async findDriverbyId(id) {
    try {
      return await driverModel.findById({ _id: id }, { password: 0 });
    } catch (error) {
      console.error(error);
    }
  }
  async findDriverByEmail(email) {
    try {
      console.log("trepo", email);
      const data = await driverModel.findOne({ email: email }).lean();
      console.log("after reading froom db", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async findDriverByPhone(phone) {
    try {
      return await driverModel.findOne({phone});
    } catch (error) {
      console.error(error);
    }
  }
  async findDriverByIdAndUpdate(id, detailsToUpdate) {
    return await driverModel
      .findByIdAndUpdate({ _id: id }, { $set: detailsToUpdate }, { new: true })
      .lean();
  }

  async getDriverByIdAndUpdate(id, dataToUpdate) {
    console.log("data to update", dataToUpdate);
    return await driverModel.findByIdAndUpdate(
      { _id: id },
      { $set: dataToUpdate },
      { new: true }
    );
  }
  async getAllDrivers(filter,page,limit) {
    try {
      console.log('f',filter,page,limit);
     const result =  await driverModel.find(filter, { password: 0 });
     console.log(result);
     return result
    } catch (error) {
      console.error(error);
    }
        
      }

  async findDriverByIdAndApprove(driverId) {
    return await driverModel.findByIdAndUpdate(
      { _id: driverId },
      { $set: { isAccepted: true } },
      {new:true}
    );
  }

  async getTotalDocs(){
    try {
      const  totalDocs = await driverModel.countDocuments()
      return totalDocs
    } catch (error) {
      
    }
  }

  async sortDriversRegistrationByDate(dateRanges){
    console.log(dateRanges);
    
const facetObj = {}
    dateRanges.forEach((element,index) => {
      const key = element.day
      facetObj[key] =[ {
        $match:{
          createdAt:{
            $gte:element.startTime,
            $lte:element.endTime
          }
        }
      },{
        $count:"totalNewUsers"
      }
      ]
    });
return  await driverModel.aggregate([{
  $facet:facetObj
  }])
  }

  
  
}

  



