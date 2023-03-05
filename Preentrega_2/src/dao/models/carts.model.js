import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

cartSchema.pre('findOne', function(next){
    this.populate('products._id')
    next()
})
cartSchema.pre('find', function(next){
    this.populate('products._id')
    next()
})
export const cartModel = mongoose.model('Carts', cartSchema)