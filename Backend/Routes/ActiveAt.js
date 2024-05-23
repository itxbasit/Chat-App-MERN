import express from 'express';
import User from '../Schema/signUp.js';
import verifySecretToken from '../Services/verifySecretToken.js';
import CodeDecoder from '../Services/codeDecoder.js';

const router = express.Router();

router.put("/", async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);
        if (decode) {
            const { email } = CodeDecoder(token);
            const user = await User.findOneAndUpdate(
                { email }, // Find user by email
                { $set: { ActiveAt: new Date() } }, // Update ActiveAt field with current timestamp
                { new: true } // Return updated user document
            );
            return res.status(200).send({ status: 200, message: "Saved time successfully" });
        }
    } catch (err) {
        return res.status(400).send({ status: 400, message: err.message });
    }
});

export default router;
