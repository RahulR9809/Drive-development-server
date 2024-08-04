import { userModel } from "../../database/schema/userSchema/userSchema.js";
export class UserRepository {
  constructor() {}
  async createUser(userData) {
    return await userModel.create(userData);
  }
  async findUserByEmail(email) {
    return await userModel.findOne({ email: email });
  }
  async findUserById(id) {
    return await userModel.findById({ _id: id });
  }
  async findByIdUpdate(id, dataToUpdate) {
    return await userModel
      .findByIdAndUpdate({ _id: id }, {$set:dataToUpdate}, { new: true })
      .lean();
  }
  async getAllUsers() {
    return await userModel.find({}, { password: 0 });
  }
}
