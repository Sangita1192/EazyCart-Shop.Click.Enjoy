import jwt from 'jsonwebtoken';
import sendErrorResponse from '../helperFunction/sendErrorResponse.js';
import UserModel from '../models/user.model.js';
import AdminModel from '../models/admin.model.js';

export const auth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

            if (!token) {
                return sendErrorResponse(res, 401, "You are not logged in");
            }

            const decode = jwt.verify(token, process.env.TOKEN_SECRET);

            if (!decode) {
                return sendErrorResponse(res, 401, "unauthorized access")
            }

            const user = await UserModel.findById(decode.id);
            if (!user) {
                return sendErrorResponse(res, 404, "User not found");
            }

            // if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            //     return sendErrorResponse(res, 403, "Access denied: insufficient permissions");
            // }

            req.userId = decode.id;
            req.userRole = user.role;

            next();

        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return sendErrorResponse(res, 401, "Access token expired");
            }

            if (error.name === 'JsonWebTokenError') {
                return sendErrorResponse(res, 401, "Invalid token");
            }
            console.log(error);

            return sendErrorResponse(res, 500, "You are not logged in");
        }
    }
}

export const adminAuth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.adminToken || req.headers.authorization?.split(" ")[1];

            if (!token) {
                return sendErrorResponse(res, 401, "Admin not logged in");
            }

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            const admin = await AdminModel.findById(decoded.id);
            if (!admin) return sendErrorResponse(res, 404, "Admin not found");

            if (allowedRoles.length && !allowedRoles.includes(admin.role)) {
                return sendErrorResponse(res, 403, "Access denied: insufficient permissions");
            }

            req.adminId = admin._id;
            req.adminRole = admin.role;

            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return sendErrorResponse(res, 401, "Admin token expired");
            }
            if (error.name === "JsonWebTokenError") {
                return sendErrorResponse(res, 401, "Invalid token");
            }
            console.log(error);
            return sendErrorResponse(res, 500, "Admin authentication failed");
        }
    };
};

