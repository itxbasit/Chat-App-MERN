import express from 'express';
import User from '../Schema/signUp.js';
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer'
import generateOTP from '../Services/otp.js'
import 'dotenv/config'

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
        const { email } = req.body;
        const otp = generateOTP();
        otpStore[email] = otp;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.verified) {
            return res.status(404).send({ status: 404, message: "Already verified" })
        }
        else {
            const info = await transporter.sendMail({
                from: `"Chat-App" <${process.env.USER}>`,
                to: email,
                subject: "Your One-Time Password (OTP)",
                html: `
            <p>Dear ${user.username},</p>
            <p>Your One-Time Password (OTP) for authentication is:</p>
            <h3>${otp}</h3>
            <p>Please use this OTP to proceed with your action. This OTP is valid for a single use and should not be shared with anyone.</p>
            <p>Regards,</p>
            <p>Chat-App Team</p>
        `
            });
            return res.status(200).send({ status: 200, message: "OTP send successfully" })
        }

    }
    catch (err) {
        return res.status(400).send({ status: 400, message: err.message })
    }
})

router.post("/verifyOTP", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!(email in otpStore)) {
            return res.status(400).send({ status: 400, message: "OTP not sent for this email" });
        }


        if (otpStore[email] !== otp) {
            return res.status(400).send({ status: 400, message: "Invalid OTP" });
        }
        delete otpStore[email];

        await User.findOneAndUpdate({ email }, { verified: true });

        return res.status(200).send({ status: 200, message: "OTP verified successfully" });
    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

export default router;