import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    purchase_datetime:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    code:{ 
        type: String,
        required: true,
        unique: true
    },
    order:{
        type: Array,
    }
})

export const ticketModel = mongoose.model('Tickets', ticketSchema)