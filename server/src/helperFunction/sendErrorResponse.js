const sendErrorResponse = (res, message,status)=>{
    return res.status(status).json({
        message,
        error:true,
        success: false
    });
}


export default sendErrorResponse;