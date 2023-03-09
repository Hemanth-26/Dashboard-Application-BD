const nodemailer = require("nodemailer");
const MAIL_SETTINGS = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

async function sendMailer(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: `OTP FROM ${process.env.APPLICATION_NAME}`,
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the ${process.env.APPLICATION_NAME}</h2>
          <h4>You are officially Registered ✔</h4>
          <p style="margin-bottom: 30px;">Please use the below One Time Password (OTP) to create your account. This will be valid for 1 hour only.</p>
          <h1 style="font-size: 16px; letter-spacing: 2px; text-align:left;">One Time Password (OTP): ${
            params.OTP
          }</h1>
          <p style="margin-top: 10px;">Regards</p>
          <p style="margin-top: 5px;">${process.env.APPLICATION_NAME.toLowerCase()} :) </p>
     </div>
      `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = sendMailer;
