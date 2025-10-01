import jwt from 'jsonwebtoken';
import sendErrorResponse from '../helperFunction/sendErrorResponse.js';
import UserModel from '../models/user.model.js';

const auth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

            if (!token) {
                return sendErrorResponse(res, 401, "You are not logged in");
            }

            const decode = jwt.verify(token, process.env.TOKEN_SECRET);

            if (!decode) {
                return sendErrorResponse(res, 401,"unauthorized access")
            }

            const user = await UserModel.findById(decode.id);
            if (!user) {
                return sendErrorResponse(res, 404, "User not found");
            }

            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                return sendErrorResponse(res,403, "Access denied: insufficient permissions");

            }

            req.userId = decode.id;
            req.userRole = user.role;

            next();

        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return sendErrorResponse(res, 401,"Access token expired");
            }

            if (error.name === 'JsonWebTokenError') {
                return sendErrorResponse(res, 401,"Invalid token");
            }
            console.log(error);

            return sendErrorResponse(res, 500, "You are not logged in");
        }
    }
}

export default auth;