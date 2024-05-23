import express from "express"
import Conversation from "../Schema/conversation.js"
import User from "../Schema/signUp.js";
import verifySecretToken from "../Services/verifySecretToken.js";
import CodeDecoder from "../Services/codeDecoder.js";

const router = express.Router()
router.post("/create/:receiverId", async (req, res) => {
  try {
    const token = req.headers['token'];
    const decode = verifySecretToken(token);

    if (decode) {
      const { id } = CodeDecoder(token);
      const userId = id
      const conversationExists = await Conversation.existsBetweenUsers(userId, req.params?.receiverId);

      if (conversationExists) {
        // return res.status(201).send({exist:conversationExists})
        const conversation = await Conversation.findOne({
          members: { $all: [userId, req.params?.receiverId] },
        });
        conversation.updatedAt = new Date();
        conversation.markModified('updatedAt');
        await conversation.save();
        return res.status(200).send({message: conversation})
      }
      const newConversation = new Conversation({
        members: [userId, req.params?.receiverId],
      });


      const savedConversation = await newConversation.save();
      return res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/getAllConv", async (req, res) => {
  try {
    const token = req.headers['token'];
    const decode = verifySecretToken(token);

    if (decode) {
      const { id } = CodeDecoder(token);
      const userId = id
      const conversation = await Conversation.find({
        members: { $in: [userId] },
      });
      res.status(200).json(conversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:secondUserId", async (req, res) => {
  try {
    const token = req.headers['token'];
    const decode = verifySecretToken(token);

    if (decode) {
      const { id } = CodeDecoder(token);
      const userId = id
      const conversation = await Conversation.findOne({
        members: { $all: [userId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/extractConnectedUser", async (req, res) => {
  try {
    // Extract the current user's ID from the request object (set by verifyToken middleware)
    const token = req.headers['token'];
    const decode = verifySecretToken(token);

    if (decode) {
      const { id } = CodeDecoder(token);

      // Aggregate to filter out the current user's ID and project necessary fields
      const conversations = await Conversation.aggregate([
        {
          $match: {
            members: id // Filter conversations where current user is a member
          }
        },
        {
          $project: {
            _id: 1,
            members: { $filter: { input: "$members", cond: { $ne: ["$$this", id] } } }, // Filter out current user's ID
            updatedAt: 1
          }
        }
      ]);

      // If no conversations found, return an empty array
      if (!conversations || conversations.length === 0) {
        return res.status(200).json({ status: 200, message: "No conversations found for the current user" });
      }

      // Extract user information for each member ID
      for (const conversation of conversations) {
        const memberIds = conversation.members;
        conversation.members = await User.find({ _id: { $in: memberIds } }).select('username proImage email ActiveAt profileSettings.hideonlineStatus');
      }

      // If conversations found, return them
      return res.status(200).json({ status: 200, message: conversations });
    }

  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

export default router