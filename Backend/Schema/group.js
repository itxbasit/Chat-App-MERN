import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define sub-schema for group members
const memberSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }
});

// Define sub-schema for group posts
const postSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    text: {
        type: String,
    },
    video: {
        type: String,
    },
    pic: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        },like: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    }],
    share: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    saved: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    });

// Define the group schema
const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    members: [memberSchema], // Array of members
    posts: [postSchema], // Array of posts within the group
    image: {
        type: String
    }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
