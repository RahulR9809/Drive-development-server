import { userModel } from "../../database/schema/userSchema/userSchema.js";
export class UserRepository {
  constructor() {}
  async createUser(userData) {
    try {
     const user =  await userModel.create(userData);
     return user
    } catch (error) {
      console.error(error);
      throw error
      
    }
    
  }
  async findUserByEmail(email) {
    return await userModel.findOne({ email: email });
  }
  async findUserById(id) {
    return await userModel.findById({ _id: id });
  }
  async findByIdUpdate(id, dataToUpdate) {
    return await userModel
      .findByIdAndUpdate({ _id: id }, { $set: dataToUpdate }, { new: true })
      .lean();
  }
  async getAllUsers(filter) {
    return await userModel.find(filter, { password: 0 });
  }

  async getTotalDocs() {
    return await userModel.countDocuments();
  }
  async getUserAndSaveContacts(id, data) {
    return await userModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { savedContacts: data } },
      { new: true }
    );
  }

  async sortNewlyRegisterdUsers(dateRanges) {
    let facetObj = {};
    dateRanges.forEach((element) => {
      const key = element.label;
      facetObj[key] = [
        {
          $match: {
            createdAt: {
              $gte: element.startTime,
              $lte: element.endTime,
            },
          },
        },
        {
          $count: "totalNewUsers",
        },
      ];
    });
    return await userModel.aggregate([
      {
        $facet: facetObj,
      }
    ]);
  }
}
