import express from 'express';
import User from '../Schema/signUp.js'; // Import your Mongoose User model
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

// POST route to handle creation of user with gender, dateOfBirth, bio, and website
router.post('/', async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { email } = CodeDecoder(token);
            const user = await User.findOne({ email });
            const { about, bio,  contact } = req.body;
            // Check if the fields are provided and not null
            const updatedFields = {};
            if (about !== undefined && about !== null) {
                updatedFields.about = about;
            }

            if (bio !== undefined && bio !== null) {
                updatedFields.bio = bio;
            }
            
            if (contact !== undefined && contact !== null) {
                updatedFields.contact = contact;
            }
            // Find the user by ID

            // Update the user with the provided fields
            Object.assign(user, updatedFields);

            // Save the updated user to the database
            const savedUser = await user.save();

            // Respond with the saved user
            return res.json({ status: 200, message: 'User updated successfully' });
        }
    } catch (error) {
        // Handle errors
        return res.status(500).json({ status: 500, message: error.message });
    }
});

export default router;
