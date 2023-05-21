import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: new Date(Date.now().valueOf() + 3600000),
        expires: 60,
    }
})

export const tokenModel = mongoose.model('Tokens', tokenSchema)