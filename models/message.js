import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const messageSchema = new mongoose.Schema( // For categories
    {   
        type:{
type:String,
required:true

        },

        message: {
            type: String,
            trim: true,
            required: true
        },
        sender: {
            type: ObjectId,
            ref:'User',
            required: true
        },
        receiver: {
            type: ObjectId,
            ref:'User',
            required: true
        },
    },
    {timestamps:true}
)

export default mongoose.model('message', messageSchema)