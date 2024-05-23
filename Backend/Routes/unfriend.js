import express from 'express';
import User from '../Schema/signUp.js';
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

router.delete("/", async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { id } = CodeDecoder(token);
            const currentUserId = id;
            
            const { friendUserId } = req.body;

            const currentUser = await User.findById(currentUserId);
            const friendUser = await User.findById(friendUserId);

            if (!currentUser || !friendUser) {
                return res.status(404).send({ status: 404, message: "User not found" });
            }

            // Remove friendUserId from friends array of currentUser
            currentUser.friends = currentUser.friends?.filter(friendId => friendId.userId.toString() !== friendUserId);

            friendUser.friends = friendUser.friends?.filter(friendId => friendId.userId.toString() !== currentUserId);
            // Remove currentUserId from followers and following arrays of friendUser
            friendUser.followers = friendUser.followers?.filter(userId => userId.userId.toString() !== currentUserId);
            friendUser.following = friendUser.following?.filter(userId => userId.userId.toString() !== currentUserId);

            // Remove friendUserId from followers and following arrays of currentUser
            currentUser.followers = currentUser.followers?.filter(userId => userId.userId.toString() !== friendUserId);
            currentUser.following = currentUser.following?.filter(userId => userId.userId.toString() !== friendUserId);

            // Remove notifications related to unfriending
            currentUser.notifications = currentUser.notifications?.filter(notification => {
                return !(notification.name === friendUser.username && 
                         (notification.msg === `${friendUser.username} sent you a request` ||
                          notification.msg === `${friendUser.username} accepted your friend request`));
            });

            friendUser.notifications = friendUser.notifications?.filter(notification => {
                return !(notification.name === currentUser.username && 
                         (notification.msg === `${currentUser.username} sent you a request` ||
                          notification.msg === `${currentUser.username} accepted your friend request`));
            });

            friendUser.markModified('notifications');
            currentUser.markModified('notifications');

            friendUser.markModified('followers');
            currentUser.markModified('followers');

            friendUser.markModified('following');
            currentUser.markModified('following');

            friendUser.markModified('friends');
            currentUser.markModified('friends');

            await currentUser.save();
            await friendUser.save();

            return res.status(200).send({ status: 200, message: "Unfriended successfully" });
        }
    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

export default router;
