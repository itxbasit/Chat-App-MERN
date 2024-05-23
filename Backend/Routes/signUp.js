import nodemailer from 'nodemailer'
import express from 'express';
import generateOTP from '../Services/otp.js'
import User from '../Schema/signUp.js';
import bcrypt from "bcrypt";
import 'dotenv/config'
import capitalizeUsername from '../Services/captalize.js';

const router = express.Router()
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false // Ignore SSL certificate errors
    }
});

let otpStore = {};
router.post("/verifyEmail", async (req, res) => {
    try {
        const { email, username } = req.body;
        const name = capitalizeUsername(username)
        const user = await User.findOne({ email })
        const userN = await User.findOne({ username: name })
        if (!user && !userN) {
            const otp = generateOTP();
            otpStore[email] = otp;

            const info = await transporter.sendMail({
                from: `"Chat App" <${process.env.USER}>`,
                to: email,
                subject: "Your One-Time Password (OTP)",
                html: `
            <p>Dear ${name},</p>
            <p>Your One-Time Password (OTP) for authentication is:</p>
            <h3>${otp}</h3>
            <p>Please use this OTP to proceed with your action. This OTP is valid for a single use and should not be shared with anyone.</p>
            <p>Regards,</p>
            <p>Chat App Team</p>
        `
            });
            return res.status(200).send({ status: 200, message: "OTP send successfully" })
        }
        else if (user) {
            throw new Error('User email already have account');
        }
        else if (userN) {
            throw new Error('Try another username because it is already in use');
        }
    }
    catch (err) {
        return res.status(400).send({ status: 400, message: err.message })
    }
})

router.post("/register", async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const username = capitalizeUsername(req.body.username)
        const user = new User({ ...req.body, password, username, verified: false, ActiveAt: new Date() });
        await user.save();
        return res.status(200).send({ status: 200, message: "User added successfully" });
    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

export default router;