import mongoose from "mongoose";

const { Schema } = mongoose;

const BostPostSchema = new Schema({
    userId: {
        type: Schema.Types.String,
    },
    post_Id: {
        type: Schema.Types.Number,
    },
    status: {
        type: Schema.Types.String,
    }
});

const BostPost = mongoose.model('BostPost', BostPostSchema);

export default BostPost;
