import sendEmail from "../services/emailService.js"

const sendEmailFun = async (to, subject, text, html) =>{
    try {
        const result = await sendEmail(to, subject, text, html);
        return result.success; 
    } catch (error) {
        console.error("sendEmailFun error:", error.message);
        return false;
    }
}

export default sendEmailFun;