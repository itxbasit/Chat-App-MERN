import express from 'express';
import User from '../Schema/signUp.js';
import bcrypt from "bcrypt";
import createSecretToken from '../Services/createSecretToken.js';
import capitalizeUsername from '../Services/captalize.js';
        
const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { password, username } = req.body;
        const name = capitalizeUsername(username)
        const emailVer = emailRegex.test(name)
        const email = emailVer ? username : null
        const user = emailVer ? await User.findOne({ email }) : await User.findOne({ username: name });
        if (!user) {
            return res.status(401).send({ status: 401, message: "user not found" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(403).send({ status: 403, message: "wrong password" })
        }
        const token = createSecretToken(user._id, user.email, user.username)

        delete user._doc.password;
        delete user._doc.posts;
        return res.status(200).send({ status: 200, token, message: user })
    }
    catch (err) {
        return res.status(400).send({ status: 400, message: err.message })
    }
})

export default router;