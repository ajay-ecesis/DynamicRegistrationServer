import mongoose from 'mongoose'
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

const likeSchema = new Schema(
    {
        postId:{
            type:String,
            trim:true,
            required:true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        status:{
            type:Boolean,

        }
    },
    {timestamps:true}
)

export default mongoose.model('Likes', likeSchema);