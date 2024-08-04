import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  profileImg:{
    type:String
  },
  authType: {
    type: String,
    enum: ["GOOGLE_AUTH", "EMAIL_AUTH"],
    default: "EMAIL_AUTH",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ location: "2dsphere" });

export const userModel = mongoose.model("user", userSchema);
