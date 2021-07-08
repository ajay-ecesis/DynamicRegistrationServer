import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const commentSchema = new mongoose.Schema( // For Post Comments
    {
        postId : {
            type: String, // Post Id from Sanity
            required: true,
            trim: true
        },
        postName : {
            type: String, // Post Name from Sanity
            required: true,
            trim: true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        message: { // type comment
            type: String,
            required: true
        }
    },
    {timestamps:true}
)

export default mongoose.model('Comment', commentSchema)