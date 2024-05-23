import express from 'express';
import User from '../Schema/signUp.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            // Exclude the password field and current user
            const allUsers = await User.find({ _id: { $ne: decode.id } })
                .select('-password');

            return res.status(200).json({ status: 200, allUsers });
        } else {
            return res.status(403).send({ status: 403, message: "Unauthorized access" });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
});

export default router;
