import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema({
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
    proImage: {
        type: Schema.Types.String,
    },
    coverImage: {
        type: Schema.Types.String,
    },
    firstName: {
        type: Schema.Types.String,   
    },
    lastName: {
        type: Schema.Types.String,   
    },
    gender: {
        type: Schema.Types.String,
        
    },
    dateOfBirth:{
        type: Date,
    },
    bio: {
        type: Schema.Types.String,
        
    },
    website: {
        type: Schema.Types.String,   
    },
    location: {
        type: Schema.Types.String,   
    },
    notifications: {
        type: Schema.Types.Mixed
    },
    followers: {
        type: Schema.Types.Mixed
    },
    following: {
        type: Schema.Types.Mixed
    },
    friendRequest: {
        type: Schema.Types.Mixed
    },
    friends: {
        type: Schema.Types.Mixed
    },
    isAdmin: {
        type: Schema.Types.Mixed
    },
    
})

const Admin = mongoose.model('admins', adminSchema);

export default Admin;