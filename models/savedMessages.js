import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const saveMessageSchema = new mongoose.Schema( // For categories
    {

        messageId: {              //messageId from message collection
            type: ObjectId,
            ref:'User',
            trim: true,
            required: true
        },
        savedBy: {                    //Id of saved person
            type: ObjectId,
            ref:'User',
            required: true
        },
       
    },
    {timestamps:true}
)

export default mongoose.model('savedMessage', saveMessageSchema)