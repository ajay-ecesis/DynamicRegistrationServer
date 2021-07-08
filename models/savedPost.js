import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const savedPostSchema = new mongoose.Schema( // For Users Saved Post
    {
        postId : {
            type: String, // Post Id from Sanity
            required: true,
            trim: true
        },
        postName: {
            type: String, // Post Name from Sanity
            required: true,
            trim: true
        },
        postSlug: {
            type: String, // Post Slug for redirecting page
            required: true,
            trim: true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
    },
    {timestamps:true}
)

export default mongoose.model('SavedPost', savedPostSchema)