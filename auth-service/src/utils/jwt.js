import jwt from "jsonwebtoken";

export const createAccessToken = async (data) => {
  try {
    const accessToken = await jwt.sign(
      data,
      process.env.JWT_ACCESSTOKEN_SECRET || 'jhssdhkjasdhask' ,
      {
        expiresIn: "2d",
      }
    );
    return accessToken;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const verifyAccessToken = async (data) => {
  try {
    console.log(process.env.JWT_ACCESSTOKEN_SECRET )
    const verifyToken = await jwt.verify(
      data,
      process.env.JWT_ACCESSTOKEN_SECRET || 'jhssdhkjasdhask' 
    );
    return verifyToken;
  } catch (error) {
    console.log("not working")
    console.error(error);
    throw error
  }
};

export const createRefreshToken = async (data) => {
  try {
    const refreshToken = await jwt.sign(
      data,
      process.env.JWT_REFRESHTOKEN_SECRET || 'hjshgdhjsgdjhsagdhjas',
      { expiresIn: "15d" }
    );
    return refreshToken;
  } catch (error) {
    console.error(error);
    throw error
  }
};
export const verifyRefreshToken = async (data) => {
  try {
    const verifyToken = await jwt.verify(
      data,
      process.env.JWT_REFRESHTOKEN_SECRET || 'hjshgdhjsgdjhsagdhjas',
    );
    return verifyToken;
  } catch (error) {
    console.error(error);
    throw error
  }
};
