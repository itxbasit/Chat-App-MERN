import express from 'express';
import User from '../Schema/signUp.js';
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

router.delete('/', async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { id } = CodeDecoder(token);
            const userId = id

            const { friendUserId } = req.body;

            // Find the current user who is rejecting the friend request
            const currentUser = await User.findById(userId);
            if (!currentUser) {
                return res.status(404).json({ status: 404, message: 'User not found' });
            }
            const friendData = await User.findById(friendUserId);
            if (!friendData) {
                return res.status(404).json({ status: 404, message: 'friend user not found' });
            }

            // Find the friend request to be rejected
            const friendRequestIndex = friendData.friendRequest.findIndex(request => request.userId.toString() === userId);
            if (friendRequestIndex === -1) {
                return res.status(404).json({ status: 404, message: 'Friend request not found' });
            }

            // Remove the friend request from currentUser's friendRequest array
            friendData.friendRequest.splice(friendRequestIndex, 1);
            // Remove related notification from currentUser's notifications array


            

            friendData.notifications = friendData.notifications?.filter(notification => {
                return !(notification.name === currentUser.username && notification.msg === `${currentUser.username} sent you a request`);
            });

            // Remove the current user from the requester's following array
            currentUser.following = currentUser.following?.filter(user => user.userId.toString() !== friendUserId);

            // Save changes to currentUser and the requester
            currentUser.markModified('following');
            friendData.markModified('notifications');
            friendData.markModified('friendRequest');

            await currentUser.save();
            await friendData.save();

            return res.status(200).json({ status: 200, message: 'Friend request withdraw successfully' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
});

export default router;
