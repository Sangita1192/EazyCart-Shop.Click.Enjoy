import jwt from 'jsonwebtoken';
import sendErrorResponse from '../helperFunction/sendErrorResponse.js';
import UserModel from '../models/user.model.js';

const auth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

            if (!token) {
                return sendErrorResponse(res, "You are not logged in", 401)
            }

            const decode = jwt.verify(token, process.env.TOKEN_SECRET);

            if (!decode) {
                return sendErrorResponse(res, "unauthorized access", 401)
            }

            const user = await UserModel.findById(decode.id);
            if (!user) {
                return sendErrorResponse(res, "User not found", 404);
            }

            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                return sendErrorResponse(res, "Access denied: insufficient permissions", 403);

            }

            req.userId = decode.id;
            req.userRole = user.role;

            next();

        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return sendErrorResponse(res, "Access token expired", 401);
            }

            if (error.name === 'JsonWebTokenError') {
                return sendErrorResponse(res, "Invalid token", 401);
            }
            console.log(error);

            return sendErrorResponse(res, "You are not logged in", 500);
        }
    }
}

export default auth;