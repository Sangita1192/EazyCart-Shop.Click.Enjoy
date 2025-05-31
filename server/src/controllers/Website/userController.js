import { generateOtp } from "../../helperFunction/generateOtp.js";
import UserModel from "../../models/user.model.js";
import bcrypt from 'bcrypt';
import emailTemplate from "../../utils/emailTemplate.js";
import sendEmailFun from "../../helperFunction/sendEmailFun.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import getAccessToken from "../../utils/getAccessToken.js";
import generateRefreshToken from "../../utils/refreshJwtToken.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import removeImg from "../../helperFunction/removeImgFromCloudinary.js";


//register new user and send verfication email
const registerUserController = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;

        if (password !== confirm_password && !password) {
            return res.status(400).json({
                errors: {
                    confirm_password: "Passwords do not match"
                }
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                errors: {
                    email: "User already registered"
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otpCode = generateOtp();

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            otp: otpCode,
            otpExpiry: Date.now() + 2 * 60 * 1000   //2 mins in ms
        });

        const savedUser = await newUser.save();

        // Send verification email
        try {
            const emailSent = await sendEmailFun(
                email,
                "Your EazyCart OTP Code",
                "",
                emailTemplate(name, otpCode)
            );

            if (!emailSent) {
                console.error("Email sending failed - deleting user");
                await UserModel.findByIdAndDelete(savedUser._id);
                return sendErrorResponse(res, "Failed to send verification email", 500);
            }
        } catch (emailError) {
            console.error("Unexpected email error:", emailError.message);
            await UserModel.findByIdAndDelete(savedUser._id);
            return sendErrorResponse(res, "Email sending error", 500);
        }


        //create jwt token for verfication purpose
        const token = jwt.sign(
            { email: savedUser.email, id: savedUser._id },
            process.env.TOKEN_SECRET
        );

        return res.status(200).json({
            message: "user registered successful",
            error: false,
            success: true,
            token
        })
    }
    catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({ errors });
        }
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
};

//verifiy user account by otp
const verifyUserAccount = async (req, res) => {
    try {
        const { otp, email } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return sendErrorResponse(res, "User not found", 401);
        };

        const isValidOtp = user.otp === Number(otp);

        const isOtpStillValid = user.otpExpiry && user.otpExpiry > Date.now();

        if (isValidOtp && isOtpStillValid) {
            user.verifyEmail = true;
            user.otp = null;
            user.otpExpiry = null;
            await user.save();

            return res.status(201).json({
                message: "Email verified successfully",
                error: false,
                success: true,
            })
        } else if (!isValidOtp) {
            return sendErrorResponse(res, "Invalid OTP", 401);
        } else {
            return sendErrorResponse(res, "OTP Expired", 401);
        }
    }
    catch (error) {
        sendErrorResponse(res, "Internal Server Error", 500)
    }
}

//resend otp controller function
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return sendErrorResponse(res, "Email is required", 400);
        }

        // Check if the user exists
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        // Generate a new OTP and set the expiry time
        const newOtp = generateOtp();
        const otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry

        // Update OTP and expiry in the database
        user.otp = newOtp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send the new OTP to the user's email
        try {
            const emailSent = await sendEmailFun(
                email,
                "Your EazyCart OTP Code",
                "",
                emailTemplate(name, otpCode)
            );

            if (!emailSent) {
                console.error("Email sending failed - deleting user");
                await UserModel.findByIdAndDelete(savedUser._id);
                return sendErrorResponse(res, "Failed to send verification email", 500);
            }
        } catch (emailError) {
            console.error("Unexpected email error:", emailError.message);
            await UserModel.findByIdAndDelete(savedUser._id);
            return sendErrorResponse(res, "Email sending error", 500);
        }

        return res.status(200).json({
            message: "OTP resent successfully. Please check your email.",
            error: false,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        sendErrorResponse(res, "Internal Server Error", 500)
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return sendErrorResponse(res, "User not found", 404)
        }
        if (user.status !== "Active") {
            return sendErrorResponse(res, "Contact to Admin", 400)
        };

        if (!user.verifyEmail) {
            return sendErrorResponse(res, "Your email is not verified yet, Please verify you email first", 400);
        }

        //check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return sendErrorResponse(res, "Password is incorrect", 400)
        }

        const accessToken = await getAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        //update loginDate
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            lastLoginDate: new Date()
        })

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        return res.status(200).json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken, refreshToken
            }
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500)
    }
}


const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;  //auth middleware

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cookieOption);
        res.clearCookie('refreshToken', cookieOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refreshToken: ""
        });

        return res.status(200).json({
            message: "Logout successfully",
            error: false,
            success: true
        });

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500)
    }
}


const userProfileUpload = async (req, res) => {
    try {
        const userId = req.userId;
        const images = req.files;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return sendErrorResponse(res, "User not found", 400);
        }

        if (!images || images.length === 0) {
            return sendErrorResponse(res, "No files uploaded", 400);
        }

        // Remove old image if it exists
        if (user.profilePicture) {
            const removeResult = await removeImg(user.profilePicture);
            if (!removeResult.success && removeResult.statusCode !== 404) {
                return sendErrorResponse(res, removeResult.message, removeResult.statusCode);
            }
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false
        }

        const imgArr = [];
        for (let i = 0; i < images?.length; i++) {
            const result = await cloudinary.uploader.upload(
                images[i].path,
                options,
            )
            imgArr.push(result.secure_url);
            //delete local file
            fs.unlinkSync(images[i].path)
        }
        user.profilePicture = imgArr[0];
        await user.save();
        return res.status(200).json({
            message: "success",
            profile: imgArr[0]
        })

    } catch (error) {
        return sendErrorResponse(res, "internal server error", 500);
    }
}


const removeImageFromCloudinary = async (req, res) => {
    try {
        const imgUrl = req.query.img;
        const userId = req.userId;

        if (!imgUrl) {
            return sendErrorResponse(res, "Image URL is required", 400);
        }

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return sendErrorResponse(res, "user not found", 404);
        }

        const removeImgResult = await removeImg(imgUrl);
        if (!removeImgResult.success && removeImgResult.statusCode !== 404) {
            return sendErrorResponse(res, removeImgResult.message, removeImgResult.statusCode);
        }

        // Clear profile picture if image was deleted or not found
        user.profilePicture = "";
        await user.save();

        return res.status(200).json({
            message: "Image removed from Cloudinary and profile updated",
        });

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "internal server error", 500)
    }
}


//update user details
const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, phone, password } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        let otpCode = null;
        let otpExpiry = null;
        let sendEmail = false;

        // Update name if provided
        if (name) {
            user.name = name;
        }

        // Update phone if provided
        if (phone) {
            user.phone = phone;
        }

        // Handle email change
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return sendErrorResponse(res, "Invalid email format", 400);
            }

            otpCode = generateOtp();
            otpExpiry = Date.now() + 5 * 60 * 1000;

            user.email = email;
            user.verifyEmail = false;
            user.otp = otpCode;
            user.otpExpiry = otpExpiry;
            sendEmail = true;
        }

        // Handle password change
        if (password) {
            if (password.length < 6) {
                return sendErrorResponse(res, "Password must be at least 6 characters", 400);
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        // Send verification email if needed
        if (sendEmail) {
            await sendEmailFun(
                user.email,
                "Verification Email from EazyCart",
                "",
                emailTemplate(user.name, otpCode)
            );

            return res.status(200).json({
                message: "Email updated. Verification email sent.",
                success: true,
                error: false
            });
        }

        return res.status(200).json({
            message: "User details updated successfully",
            success: true,
            error: false
        });

    } catch (error) {
        console.error("Update User Error:", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
};

//forgotPasword
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.userId;

        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        let otpCode = generateOtp();
        user.otp = otpCode;
        user.otpExpiry = Date.now() + 60000;

        await user.save();

        await sendEmailFun(
            email,
            "otp has been send to your email",
            "",
            emailTemplate(user?.name, otpCode)
        )

        await user.save();

        return res.status(200).json({
            message: "link has been sent to your email",
            error: false,
            success: true,
        })
    }
    catch (error) {
        console.error("Update User Error:", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}


export { registerUserController, verifyUserAccount, resendOTP, userLogin, logoutUser, userProfileUpload, removeImageFromCloudinary, updateUserDetails, forgotPassword }