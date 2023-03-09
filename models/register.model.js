const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const RegisterSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        min: 1,
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        min: 1,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        // unique: true,
        min: 1,
    },
    gender: {
        type : String
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 8,
    },
    otp: {
        type : String,
    },
    otp_sent: {
        type: Date,
        default: () => new Date(),
    },
    validUser: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: Number,
        default: 0,  
    },
    updatedAt: {
        type: Date,
        default: () => new Date(),
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    }
});

RegisterSchema.pre("save", async function(next) {
    this.updatedAt = Date.now();
    next();
})

module.exports = mongoose.model("Users", RegisterSchema);