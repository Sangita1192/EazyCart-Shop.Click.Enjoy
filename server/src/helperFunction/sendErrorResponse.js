const sendErrorResponse = (res, status, message)=>{
    return res.status(status).json({
        message,
        error:true,
        success: false
    });
}


export default sendErrorResponse;