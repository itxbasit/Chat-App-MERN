import express from 'express';
import User from '../Schema/signUp.js';
import bcrypt from "bcrypt";
import createSecretToken from '../Services/createSecretToken.js';
import capitalizeUsername from '../Services/captalize.js';

const router = express.Router()

router.get("/:email", async (req, res) => {
    try {
        const userEmail = req.params.email

        const currentUser = await User.findOne({ email: userEmail });
        if (!currentUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        delete currentUser._doc.password;
        return res.status(200).send({ status: 200, message: currentUser })
    }
    catch (err) {
        return res.status(400).send({ status: 400, message: err.message })
    }
})

export default router;