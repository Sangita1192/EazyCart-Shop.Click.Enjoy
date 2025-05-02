import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

//configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


//function to sendEmail
const sendEmail = async(to, subject, text, html)=>{
    try{
        const response = await transporter.sendMail({
            from: process.env.EMAIL,  //sender email
            to,
            subject,
            text,
            html
        });
        return {
            success: true,
            message: "Email sent successfully",
            response
        };
    }
    catch(error){
        console.log("Error sending email", error);
        return {
            success: false,
            message: "Failed to send email",
            error: error.message
        };
    }
};


export default sendEmail;