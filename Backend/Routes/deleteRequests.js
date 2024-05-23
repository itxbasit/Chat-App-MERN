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

            const { friendRequestId } = req.body;

            // Find the current user who is rejecting the friend request
            const currentUser = await User.findById(userId);
            if (!currentUser) {
                return res.status(404).json({ status: 404, message: 'User not found' });
            }

            // Find the friend request to be rejected
            const friendRequestIndex = currentUser.friendRequest.findIndex(request => request.userId.toString() === friendRequestId);
            if (friendRequestIndex === -1) {
                return res.status(404).json({ status: 404, message: 'Friend request not found' });
            }

            // Remove the friend request from currentUser's friendRequest array
            currentUser.friendRequest.splice(friendRequestIndex, 1);

            // Remove related notification from currentUser's notifications array


            const requester = await User.findById(friendRequestId);
            if (!requester) {
                return res.status(404).json({ status: 404, message: 'Requester user not found' });
            }

            currentUser.notifications = currentUser.notifications?.filter(notification => {
                return !(notification.name === requester.username && notification.msg === `${requester.username} sent you a request`);
            });

            // Remove the current user from the requester's following array
            requester.following = requester.following?.filter(user => user.userId.toString() !== userId);

            // Remove the current user from the requester's friends array
            requester.friends = requester.friends?.filter(friend => friend.userId.toString() !== userId);

            // Save changes to currentUser and the requester
            currentUser.markModified('friendRequest');
            currentUser.markModified('notifications');
            requester.markModified('following');

            await currentUser.save();
            await requester.save();

            return res.status(200).json({ status: 200, message: 'Friend request rejected successfully' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
});

export default router;
