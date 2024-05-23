import express from "express"
import Message from "../Schema/messageModel.js"
import verifySecretToken from "../Services/verifySecretToken.js";
import CodeDecoder from "../Services/codeDecoder.js";
import Conversation from "../Schema/conversation.js";
import User from '../Schema/signUp.js';

const router = express.Router()

router.post("/", async (req, res) => {


  try {
    const token = req.headers['token'];
    const decode = verifySecretToken(token);

    if (decode) {
      const { id } = CodeDecoder(token);
      const newMessage = new Message({ sender: id, ...req.body });
      const currentUser = await User.findById(id);
      const savedMessage = await newMessage.save();
      const conversation = await Conversation.findById(savedMessage.conversationId);
      conversation?.members?.map(async (v) => {
        if (v != id) {
          const receUser = await User.findById(v)
          const members = await User.find({ _id: { $in: receUser._id } }).select('username proImage email ActiveAt profileSettings.hideonlineStatus')
          conversation.members = members.map(user => user);
          const newNotification = {
            img: currentUser.proImage,
            msg: `${currentUser.username} send you a message`,
            name: currentUser.username,
            id: savedMessage._id,
            time: new Date(),
            read: false,
            type: "msg",
            conversation
          };
          receUser.notifications = receUser.notifications || [];
          receUser.notifications.unshift(newNotification);
          receUser.markModified('notifications')
          await receUser.save()
        }
      })
      res.status(200).json(savedMessage);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const token = req.headers['token'];

    // Ensure token exists
    if (!token) {
      return res.status(401).send({ message: "Token missing" });
    }

    // Verify token
    const decode = verifySecretToken(token);
    if (!decode) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Extract user ID from token
    const { id } = CodeDecoder(token);

    // Retrieve messages for the given conversation ID
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    // Send messages to client
    res.status(200).send(messages);
  } catch (err) {
    // Handle any errors
    console.error("Error:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router