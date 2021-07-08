import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true
        },
    },
    {timestamps:true}
)

export default mongoose.model('Newsletter', newsletterSchema);