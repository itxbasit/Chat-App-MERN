import express from 'express';
import User from '../Schema/signUp.js';
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { id } = CodeDecoder(token);
            const userId = id

            const { friendRequestId } = req.body;
            // Check if friendRequestId is provided
            if (!friendRequestId) {
                return res.status(400).json({status: 400,  message: 'Friend request ID is required' });
            }

            // Find the current user who is confirming the friend request
            const currentUser = await User.findById(userId);
            if (!currentUser) {
                return res.status(404).json({status: 404,  message: 'User not found' });
            }

            // Check if friendRequestId is a valid ObjectId
            if (typeof friendRequestId !== 'string') {
                return res.status(400).json({status: 400,  message: 'Invalid friend request ID' });
            }

            // Find the friend request to be confirmed
            const friendRequest = currentUser.friendRequest.find(request => request.userId && request.userId.toString() === friendRequestId);
            if (!friendRequest) {
                return res.status(404).json({ status: 404, message: 'Friend request not found' });
            }

            // Find the user who sent the friend request
            const senderUser = await User.findById(friendRequest.userId);
            if (!senderUser) {
                return res.status(404).json({ status: 404, message: 'Sender user not found' });
            }

            // Initialize currentUser.friends and senderUser.followers if they are undefined
            currentUser.friends = currentUser.friends || [];
            currentUser.followers = currentUser.followers || [];
            senderUser.friends = senderUser.friends || [];
            // Add senderUser to currentUser's friends and currentUser to senderUser's followers
            currentUser.friends.unshift({
                userId: senderUser._id,
                email: senderUser.email,
                name: senderUser.username,
                bio: senderUser.bio,
                proImage: senderUser.proImage
            });

            senderUser.friends.unshift({
                userId: currentUser._id,
                email: currentUser.email,
                name: currentUser.username,
                bio: currentUser.bio,
                proImage: currentUser.proImage
            });

            const newNotification = {
                userId: senderUser._id,
                email: senderUser.email,
                name: senderUser.username,
                bio: senderUser.bio,
                proImage: senderUser.proImage,
                msg: `${senderUser.username} accepted your friend request`,
                time: new Date(),
                read: false,
                type: 'accept'
            };


            currentUser.followers.unshift({
                userId: senderUser._id,
                email: senderUser.email,
                name: senderUser.username,
                bio: senderUser.bio,
                proImage: senderUser.proImage
            });

            senderUser.notifications = senderUser.notifications || [];

            // Add the notification to the receiving user's notifications array
            senderUser.notifications.unshift(newNotification);

            // Save the changes to the receiving user's document
            senderUser.markModified('notifications');
            await senderUser.save();

            // Remove the friend request from currentUser's friendRequest array
            currentUser.friendRequest = currentUser.friendRequest.filter(request => request.userId && request.userId.toString() !== friendRequestId);

            currentUser.notifications = currentUser.notifications?.filter(notification => {
                return !(notification.name === senderUser.username && notification.msg === `${senderUser.username} sent you a request`);
            });

            currentUser.markModified('notifications')

            // Save changes to currentUser and senderUser
            currentUser.markModified('friends');
            currentUser.markModified('followers');
            senderUser.markModified('friends');

            await currentUser.save();
            await senderUser.save();

            return res.status(200).json({ status: 200,  message: 'Friend request confirmed successfully' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
});

export default router;
