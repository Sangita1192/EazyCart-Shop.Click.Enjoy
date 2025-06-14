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
import mongoose from "mongoose";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";


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
        const otpExpiry = Date.now() + (2 * 60 * 1000);

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

//Login controller
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
            return sendErrorResponse(res, "Password is Incorrect", 400)
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
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        return res.status(200).json({
            message: "Login successful",
            error: false,
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                profilePicture: user.profilePicture,
            }
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500)
    }
}

//logout controller
const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;  //auth middleware

        if (!userId) {
            return sendErrorResponse(res, "Unauthorized", 401);
        }

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cookieOption);
        res.clearCookie('refreshToken', cookieOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            accessToken: "",
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

//get User from token controller
const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404)
        }

        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profilePicture: user.profilePicture,
            role: user.role,
            status: user.status,
            verifyEmail: user.verifyEmail,
            address: user.addressDetail
        };

        res.status(200).json({ user: safeUser });

    } catch (error) {
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
    console.log(req.body);
    console.log(req.userId);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userId;
        const { name, email, phone } = req.body;
        const profileImage = req.file;

        const user = await UserModel.findById(userId).session(session);
        if (!user) {
            await session.abortTransaction();

            return sendErrorResponse(res, "User not found", 404);
        }

        let sendVerificationEmail = false;

        // Update user if provided
        if (name?.trim()) user.name = name.trim();
        if (phone?.trim()) user.phone = phone.trim();

        // Handle email change
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                await session.abortTransaction();

                return sendErrorResponse(res, "Invalid email format", 400);
            }

            //if email already exists
            const existingEmailUser = await UserModel.findOne({ email }).session(session);
            if (existingEmailUser) {
                await session.abortTransaction();

                return sendErrorResponse(res, "Email already in use", 409);
            }

            user.email = email;
            user.verifyEmail = false;

            user.otp = generateOtp();
            user.otpExpiry = Date.now() + 5 * 60 * 1000;
            sendVerificationEmail = true;
        }

        if (profileImage?.path) {
            if (user?.profilePicture) {
                const publicId = extractPublicId(user.profilePicture);
                await removeImageFromCloudinary(publicId);
            }
            const result = await uploadImageToCloudinary(profileImage.path);
            if (!result.success) {
                await session.abortTransaction();

                return sendErrorResponse(res, result.message, 500);
            }
            user.profilePicture = result.url;
        }
        await user.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        // Send verification email if needed
        if (sendVerificationEmail) {
            await sendEmailFun(
                user.email,
                "Verification Email from EazyCart",
                "",
                emailTemplate(user.name, user.otp)
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
        await session.abortTransaction();
        return sendErrorResponse(res, "Internal server error", 500);
    } finally {
        session.endSession();
    }
};

//forgotPasword
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        //Generate token valid for 15 minutes
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.RESET_PASSWORD_SECRET,
            { expiresIn: '15m' }
        );

        const resetLink = `https://localhost:5173/reset-password?token=${resetToken}`;

        await sendEmailFun(
            email,
            "Reset Your Password",
            "",
            `<p>Hi ${user.name},</p>
            <p>You requested to reset your password.</p>
            <p>Click the link below to set a new password:</p>
            <a href="${resetLink}" target="_blank">${resetLink}</a>
            <p>This link will expire in 15 minutes.</p>`
        );

        return res.status(200).json({
            message: "Password reset link has been sent to your email",
            error: false,
            success: true,
            resetToken
        })
    }
    catch (error) {
        console.error("Update User Error:", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}

//reset password
const resetPassword = async (req, res) => {
    try {
        const { token, password, confirm_password } = req.body;
        if (!token) {
            return sendErrorResponse(res, "Token is required", 400);
        }
        if (!password || !confirm_password) {
            return sendErrorResponse(res, "Password and confirm password are required", 400);
        }

        if (password !== confirm_password) {
            return sendErrorResponse(res, "Passwords do not match", 400);
        }

        //verify token
        let decode;
        try {
            decode = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        } catch (err) {
            return sendErrorResponse(res, "Invalid or expired token", 400);
        }

        const userId = decode?.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Password has been reset successfully",
        });


    }
    catch (error) {
        console.error("Update User Error:", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}


export { registerUserController, verifyUserAccount, resendOTP, userLogin, logoutUser, userProfileUpload, removeImageFromCloudinary, updateUserDetails, forgotPassword, getUser, resetPassword }