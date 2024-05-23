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
            const { friendUserId } = req.body;

            // Find the user sending the friend request
            const userSendingRequest = await User.findById(userId);
            if (!userSendingRequest) {
                return res.status(404).json({ status: 404, message: 'User sending the request not found' });
            }

            // Find the user to whom the friend request is being sent
            const userToReceiveRequest = await User.findById(friendUserId);
            if (!userToReceiveRequest) {
                return res.status(404).json({ status: 404, message: 'User to receive the request not found' });
            }

            // Check if the friend request already exists
            if (userToReceiveRequest.friendRequest && userToReceiveRequest.friendRequest.some(request => request.userId === userId)) {
                return res.status(400).json({ status: 400, message: 'Friend request already sent' });
            }

            // Initialize the friendRequest array if it does not exist
            userToReceiveRequest.friendRequest = userToReceiveRequest.friendRequest || [];

            // Add the friend request to the receiving user's friendRequest array
            userToReceiveRequest.friendRequest.unshift({
                userId: userId,
                email: userSendingRequest.email,
                name: userSendingRequest.username,
                bio: userSendingRequest.bio,
                proImage: userSendingRequest.proImage
            });
            const newNotification = {
                userId: userId,
                email: userSendingRequest.email,
                name: userSendingRequest.username,
                bio: userSendingRequest.bio,
                proImage: userSendingRequest.proImage,
                msg: `${userSendingRequest.username} sent you a request`,
                time: new Date(),
                read: false,
                about: userSendingRequest.about,
                type: 'request'
            };
            // Save the changes to the receiving user's document
            userToReceiveRequest.markModified('following');
            userToReceiveRequest.markModified('friendRequest');
            await userToReceiveRequest.save();

            // Initialize the notifications array if it does not exist
            userToReceiveRequest.notifications = userToReceiveRequest.notifications || [];

            // Add the notification to the receiving user's notifications array
            userToReceiveRequest.notifications.unshift(newNotification);

            // Save the changes to the receiving user's document
            userToReceiveRequest.markModified('notifications');
            await userToReceiveRequest.save();
            

            // Initialize the following array if it does not exist
            userSendingRequest.following = userSendingRequest.following || [];

            // Add the friend to the sending user's following array
            userSendingRequest.following.unshift({
                userId: friendUserId,
                email: userToReceiveRequest.email,
                name: userToReceiveRequest.username,
                bio: userToReceiveRequest.bio,
                proImage: userToReceiveRequest.proImage
            });

            // Save the changes to the sending user's document
            userSendingRequest.markModified('following');
            userSendingRequest.markModified('friendRequest');
            await userSendingRequest.save();

            return res.status(200).json({ status: 200, message: 'Friend request sent successfully' });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
});

export default router;
