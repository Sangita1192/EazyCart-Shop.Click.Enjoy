import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import AdminModel from "../../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerAdminUser = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;

        if (!name || !email || !password) {
            return sendErrorResponse(res, 400, "All fields are required");
        }

        if (password !== confirm_password) {
            return sendErrorResponse(res, 400, "Password doesn't match");
        }

        const existingAdminUser = await AdminModel.findOne({ email });
        if (existingAdminUser) {
            return res.status(409).json({
                errors: {
                    email: "Admin user already exists"
                }
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdminUser = new AdminModel({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN"
        });

        await newAdminUser.save();

        return res.status(200).json({
            message: "user registered successful",
            error: false,
            success: true,
        })
    }
    catch (error) {
        console.log("error in creating admin user", error);
        return sendErrorResponse(res, 500, "Internal server error")
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminUser = await AdminModel.findOne({ email });

        if (!email || !password) {
            return sendErrorResponse(res, 400, "email or password required");
        }

        if (!adminUser) {
            return sendErrorResponse(res, 404, "user not found");
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password);
        if (!isPasswordValid) {
            return sendErrorResponse(res, 400, "Password is Incorrect");
        };

        const token = jwt.sign(
            { id: adminUser._id, role: adminUser.role },
            process.env.TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        const cookieOption = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        }

        res.cookie("adminToken", token, cookieOption);
        return res.status(200).json({
            error: false,
            success: true,
            user: {
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role
            }
        })
    }
    catch (error) {
        console.log("admin Login error", error);
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
};


export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax",
            path: "/", 
        });

        return res.status(200).json({
            success: true,
            message: "Admin logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);
        return sendErrorResponse(res, 500, "Internal server error");
    }
};

