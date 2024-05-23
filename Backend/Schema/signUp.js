import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    verified: {
        type: Schema.Types.Boolean,
        default: false
        
    },
    ActiveAt : {
        type: Date,
    },
    proImage: {
        type: Schema.Types.String,
    },
    bio: {
        type: Schema.Types.String,  
    },
    about: {
        type: Schema.Types.String,  
    },
    contact: {
        type: Schema.Types.Number,  
    },
    notifications: {
        type: Schema.Types.Mixed
    },
    friendRequest: {
        type: Schema.Types.Mixed
    },
    friends: {
        type: Schema.Types.Mixed
    },
    followers: {
        type: Schema.Types.Mixed
    },
    following: {
        type: Schema.Types.Mixed
    },
})

const User = mongoose.model('users', userSchema);

export default User;