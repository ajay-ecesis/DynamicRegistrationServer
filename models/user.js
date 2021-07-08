import mongoose from 'mongoose'
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64
        },
        zipCode: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        country: {
            type: String,
            trim: true,
            required: true
        },
        role: {
            type: Number,
            required: true
            /* default: 0  */// 0-Brand, 1-Supplier, 3-Admin
        },
        status: {
            type: Number,
            default: 0
        }
    },
    {timestamps:true}
);

export default mongoose.model('User', userSchema);