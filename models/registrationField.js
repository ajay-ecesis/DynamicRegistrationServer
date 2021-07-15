import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const registrationField = new mongoose.Schema(
    {
        fieldName: {
            type: String,
            trim: true,
            required: true
        },
        fieldType:{
            type:String,
            trim:true,
            required:true
        },
        validation:{
            type:String,
            trim:true,
            required:true
        },
        addedBy: {
            type: ObjectId,
            ref:'User',
            required: true
        },
        fieldFor:{
            type:String,
            trim:true,
            required:true
        }
    },
    {timestamps:true}
)

export default mongoose.model('registrationField', registrationField);