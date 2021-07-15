import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const customFieldValues = new mongoose.Schema( // For Post Comments
    {
        
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        // fieldId: { // Id of the fields
        //     type: ObjectId,
        //     ref: 'registrationField',
        //     required: true
        // },
        fieldName:{
            type:String,
            required:true,
            trim:true
        },
        value:{
            type:String,
            required: true,
            trim: true
        }
        

    },
    {timestamps:true}
)

export default mongoose.model('customFieldValues', customFieldValues)