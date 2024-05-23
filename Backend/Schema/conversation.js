import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
ConversationSchema.statics.existsBetweenUsers = async function(userId1, userId2) {
  const conversation = await this.findOne({
    members: { $all: [userId1, userId2] }
  });
  return conversation !== null;
};

const Conversation= mongoose.model("Conversation", ConversationSchema);
export default Conversation