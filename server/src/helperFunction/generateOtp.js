function generateOtp() {
    let otpCode;
    do {
        otpCode = Math.floor(Math.random() * 1000000);
    } while (otpCode < 100000); // ensures it's always 6 digits
    return otpCode;
}

export {generateOtp}



