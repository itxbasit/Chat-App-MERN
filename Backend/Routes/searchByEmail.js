import express from 'express';
import User from '../Schema/signUp.js';
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router()

router.get("/", async (req, res) => {
    try {

        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { email } = CodeDecoder(token);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ status: 404, message: "user not found" })
            }

            delete user._doc.password;
            return res.status(200).send({ status: 200, message: user })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ status: 400, message: err.message })
    }
})

export default router;