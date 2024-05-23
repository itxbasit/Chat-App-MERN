import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const adsSchema = new Schema({
    userId: {
        type: Schema.Types.String,
    },
    status: {
        type: Schema.Types.String,
    },
    time: {
        type: Date,
    },
    addTimeRemaining: {
        type: Date,
    },
    pic: {
        type: Schema.Types.String
    },
    like:{
        type: Schema.Types.Array
    },
    comments: {
        type: Schema.Types.Array
    },
    text: {
        type: Schema.Types.String
    },
    status: {
        type: Schema.Types.String
    },
})

const User = mongoose.model('ads', adsSchema);

export default User;