import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


const getAccessToken = async (id)=>{
    const token = await jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {expiresIn: '5h'}
    )
    return token;
}

export default getAccessToken;