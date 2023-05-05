import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts',
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tickets',
        },
    ],
})

export const userModel = mongoose.model('Users', userSchema)