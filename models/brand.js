import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const brandSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: ObjectId,
            ref: 'Category',
        },
        brandName: {
            type: String,
            trim: true,
            required: true
        },
        url: {
            type: String,
            trim: true,
        },
        market: {
            type: ObjectId,
            ref: 'Market',
        },
        linkedIn: {
            type: String,
            trim: true,
        },
    },
    {timestamps:true}
)

export default mongoose.model('Brand', brandSchema)