import mongoose from "mongoose";
import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";

export class TripDetailsController {
  constructor() {}
  async tripDetailsController(req, res, next) {
    try {
      const { driverId } = req.params;
      console.log("driverId", driverId);
     const tripDetails =  await tripModel.aggregate([
        { $match: { driverId: new mongoose.Types.ObjectId(driverId) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "users",
          },
        },
      ]);
      console.log('TripDetials',tripDetails)
      res.status(200).json({tripData:tripDetails})
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
