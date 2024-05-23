import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const blueTickSchema = new Schema({
    username: {
        type: Schema.Types.String,
    },
    email: {
        type: Schema.Types.String,
    },
    proImage: {
        type: Schema.Types.String,
    },
    userId: {
        type: Schema.Types.String,
    },
    Join_Community: {
        type: Schema.Types.String,
    },
    XV_Token: {
        type: Schema.Types.String,
    },
    why_Choose: {
        type: Schema.Types.String,
    },
    status: {
        type: Schema.Types.String,
    }
})

const User = mongoose.model('blue tick', blueTickSchema);

export default User;