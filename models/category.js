import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema( // For categories
    {
        
        categoryName: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        addedBy: {
            type: ObjectId,
            ref:'User',
            required: true
        },
        status: {
            type: Number,
            default: 0
        },
       
    },
    {timestamps:true}
)

export default mongoose.model('Category', categorySchema)