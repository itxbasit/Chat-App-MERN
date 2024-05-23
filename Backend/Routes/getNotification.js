import express from 'express';
import User from '../Schema/signUp.js';
import CodeDecoder from '../Services/codeDecoder.js';
import verifySecretToken from '../Services/verifySecretToken.js';

const router = express.Router();

// Endpoint to retrieve notifications for a specific user by email
router.get("/", async (req, res) => {
    try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
            const { email } = CodeDecoder(token);
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ status: 404, message: "User not found" });
            }

            // Filter notifications based on user's notification settings
            const notifications = user.notifications || [];
            const notificationSettings = user.notificationSettings || {};

            // Filter notifications based on notification settings
            const filteredNotifications = notifications.filter(notification => {
                // Check if the notification type is allowed based on notification settings
                switch (notification.type) {
                    case 'comment':
                        return notificationSettings.someComment !== false;
                    case 'like':
                        return notificationSettings.someReactPost !== false;
                    case 'reactComment':
                        return notificationSettings.someReactComment !== false;
                    // Add more cases for other notification types if necessary
                    case 'replyComment':
                        return notificationSettings.someReplyComment !== false;
                    case 'share':
                        return notificationSettings.someSharedPost !== false;
                    case 'accept':
                        return notificationSettings.acceptRequest !== false;
                    case 'mentionPost':
                        return notificationSettings.mentionPost !== false;
                    case 'mentionComment':
                        return notificationSettings.mentionComment !== false;
                    case 'sentNewMessage':
                        return notificationSettings.sentNewMessage !== false;
                    case 'request':
                        return notificationSettings.receivedRequest !== false;
                    case 'videoConversionComplete':
                        return notificationSettings.videoConversionComplete !== false;
                    case 'videoConversionFail':
                        return notificationSettings.videoConversionFail !== false;
                    default:
                        return true; // Allow other types by default
                }
            });

            return res.status(200).send({ status: 200, message: filteredNotifications });
        }
    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

export default router;
