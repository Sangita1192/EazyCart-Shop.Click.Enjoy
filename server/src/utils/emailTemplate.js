const emailTemplate = (name, otp) => {
    const year = new Date().getFullYear();
  
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>EazyCart Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #4CAF50;
            margin: 0;
            font-size: 24px;
          }
          .content p {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
          }
          .otp-box {
            background-color: #f1f1f1;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            letter-spacing: 4px;
            font-weight: bold;
            border-radius: 4px;
            color: #333;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to EazyCart</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for signing up on <strong>EazyCart</strong>. Please use the OTP code below to verify your email address:</p>
            <div class="otp-box">${otp}</div>
            <p>This code is valid for 2 minutes. If you didn’t request this, you can safely ignore this email.</p>
            <p>Happy Shopping,<br /><strong>EazyCart Team</strong></p>
          </div>
          <div class="footer">
            &copy; ${year} EazyCart. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
  };
  
  export default emailTemplate;
  