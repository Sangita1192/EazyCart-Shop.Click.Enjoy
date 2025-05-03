import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";


const generateRefreshToken = async (id)=>{
    const token = jwt.sign(
        {id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    const updateRefreshTokenUser = await UserModel.updateOne(
       { _id:id},
       {refreshToken : token}
    )
    return token;
}

export default generateRefreshToken;