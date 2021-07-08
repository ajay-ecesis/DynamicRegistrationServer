import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const replyCommentSchema = new mongoose.Schema( // For Post Comments
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
        commentId: { // Reply To
            type: ObjectId,
            ref: 'Comment',
            required: true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        message: { // Reply Comments
            type: String,
            required: true
        }
    },
    {timestamps:true}
)

export default mongoose.model('ReplyComment', replyCommentSchema)