import jwt from 'jsonwebtoken';
import sendErrorResponse from '../helperFunction/sendErrorResponse.js';

const auth = async(req,res, next)=>{
    try{
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

        if(!token){
            return sendErrorResponse(res,"Provide token",401)
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        if(!decode){
            return sendErrorResponse(res, "unauthorized access", 401)
        }

        req.userId = decode.id

        next();

    }
    catch(error){
        return sendErrorResponse(res,"You are not logged in", 500)
    }
}

export default auth;