
const moment = require("moment");
const User = require("../models/register.model");
const generate = require("../utils/generate");
const sendMail = require("../services/sendMail");
const errorMessages = require("../utils/validationErrMsg");
const { hashPassword } = require("../utils/hash");

let RegisterUser = async(req, res) => {
    const data = req.body;
    // const dotp = 1111;
	const _otp = generate(4);
    try{
        const hashedPassword = await hashPassword(data.password);

        const addUser = await new User({...data, password: hashedPassword, dob: moment(data.dob, "DD-MM-YYYY"), otp: _otp});
        await addUser.save();
        // let emailInfo = await sendMail({
        //     to: data.email,
        //     OTP: _otp,
        //   });
        // console.log(emailInfo);
        res.status(200).json({message: "OTP sent successfully"});
    }catch(error){
        res.status(400).json({message: errorMessages(error)});
    }
};

let VerifyOtp = async(req, res) => {
    const {email, otp} = req.body;
    try{
        const userData = await User.findOne({email, otp});
        let check = moment(new Date).diff(userData?.otp_sent, 'hours');
        if (!userData) return res.status(400).json({message: "Invalid OTP"});
        else if (check > 1) return res.status(400).json({message: "OTP expried"});
            
        userData.validUser = true;
        await userData.save();
        res.status(200).json({message: "OTP is verified successfully"});
    }catch(error) {
        res.status(400).json({message: errorMessages(error)});
    }
};

let ResendOtp = async(req, res) => {
    const {email} = req.body;
	const _otp = generate(4);

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "email not registered"});
        user.otp = _otp;
        user.otp_sent = new Date;
        await user.save();
        res.status(200).json({message: "OTP send successfully"});
    }catch(error) {
        res.status(400).json({message: errorMessages(error)});
    }
};

let ForgotPassword = async(req, res) => {
    const {email} = req.body;
	const _otp = generate(4);

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "email not registered"});
        user.otp = _otp;
        user.otp_sent = new Date;
        await user.save();
        res.status(200).json({message: "OTP send successfully"});
    }catch(error) {
        res.status(400).json({message: errorMessages(error)});
    }
};

let ConfirmPassword = async(req, res) => {
    const {email, password} = req.body;

    try{
        const hashedPassword = await hashPassword(password);

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "email not registered"});
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message: "password changed successfully"});
    }catch(error) {
        res.status(400).json({message: errorMessages(error)});
    }
}

module.exports = {
    RegisterUser,
    VerifyOtp,
    ResendOtp,
    ForgotPassword,
    ConfirmPassword,
}