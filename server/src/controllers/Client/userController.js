import { generateOtp } from "../../helperFunction/generateOtp.js";
import UserModel from "../../models/user.model.js";
import bcrypt from 'bcrypt';
import emailTemplate from "../../utils/emailTemplate.js";
import sendEmailFun from "../../helperFunction/sendEmailFun.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


const registerUserController = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        if (!name || !email || !password || !confirm_password) {
            return res.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false,
            });
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                message: "password doesn't match",
                error: true,
                success: false
            })
        }


        const otpCode = generateOtp();

        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(401).json({
                message: "user already registered!",
                error: true,
                success: false
            })
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            name,
            otp: otpCode,
            otpExpiry: Date.now() + 2 * 60 * 1000   //2 mins in ms
        });

        const userData = await newUser.save();

        //send verfication email
        const verificationEmail = await sendEmailFun(
            email,
            "Your EazyCart OTP Code",
            "",
            emailTemplate(name, otpCode)
        );

        //create jwt token for verfication purpose
        const token = jwt.sign(
            { email: userData.email, id: userData._id },
            process.env.TOKEN_SECRET
        );

        return res.status(201).json({
            message: "user registered successfully! Please verify your email.",
            error: false,
            success: true,
            token
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false,
        })
    }
};

export { registerUserController }