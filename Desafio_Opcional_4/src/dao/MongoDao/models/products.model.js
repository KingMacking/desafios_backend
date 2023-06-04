import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required:true,
    }, 
    code: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: String,
        default: 'admin'
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('Products', productSchema)