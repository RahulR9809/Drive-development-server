import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";
export class TripRepository {
  constructor() {}
  async createTrip(data) {
    return await tripModel.create(data);
  }
  async findTrip(id) {
    return await tripModel.findById({ _id: id }).populate('userId').populate('driverId')
  }
  async findTripByIdAndUpdate(id, data) {
    console.log('inside repo',id,data);
    
    return await tripModel.findByIdAndUpdate({ _id: id }, { $set: data },{new:true}).populate('driverId')
    
  }
  async findTripByIdAndReject(tripId, status) { 
    return await tripModel.findByIdAndUpdate(
      { _id:tripId  },
      { $set: { requestStatus: status }, $push: { rejectedDrivers: driverId } }
    );
  }

  async findAllTrips(userID){
    return await tripModel.find({userId:userID}).populate('driverId').populate('userId')
  }


}
