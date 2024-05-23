import express from 'express';
import User from '../Schema/signUp.js';
import uploadImage from '../Config/cloudinaryFunc.js';
import multer from 'multer';
import verifySecretToken from '../Services/verifySecretToken.js';
import CodeDecoder from '../Services/codeDecoder.js';

const router = express.Router();
const upload = multer();
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { email } = CodeDecoder(token);

            const user = await User.findOne({ email });
            
            if (!user) { 
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            if (!req.file) {
                return res.status(400).json({ status: 400, message: "No image provided" });
            }
            // Upload image to Cloudinary
            const imageUrl = await uploadImage(req.file.buffer, email, "profileImg_");

            // Update proImage in the current user document
            user.proImage = imageUrl;
            console.log(imageUrl)
            const userId = user._id.toString()

            // Update proImage in friendRequest array where userId matches the current user's ID
            await User.updateMany({ 'friendRequest.userId': userId }, { $set: { 'friendRequest.$.proImage': imageUrl } });

            // Update proImage in friends array where userId matches the current user's ID
            await User.updateMany({ 'friends.userId': userId }, { $set: { 'friends.$.proImage': imageUrl } });


            // Update img in notifications array where name matches the current user's username
            await User.updateMany({ 'notifications.name': user.username }, { $set: { 'notifications.$.img': imageUrl } });


            // Save the updated user document
            await user.save();

            return res.status(200).json({ status: 200, message: "Image uploaded successfully" });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: err.message });
    }
});


export default router;
