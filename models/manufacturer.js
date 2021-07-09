import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema;

const manufacturerSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        supplierName: {
            type: String,
            trim: true,
            required: true
        },
        category: {
            type: String,
            trim: true,
        },
        year: {
            type: Number,
            trim: true,
        },
        employees: {
            type: String,
            trim: true,
            required: true
        },
        speciality: {
            type: String,
            trim: true,
        },
        sku: {
            type: Number,
            trim: true,
            required: true
        },
        samplingTime: {
            type: String,
            trim: true,
            required: true
        },
        dailyCapacity: {
            type: Number,
            trim: true,
        },
        monthlyCapacity: {
            type: Number,
            trim: true,
            required: true
        },
        terms: {
            type: String,
            trim: true,
        },
        importantClients: {
            type: String,
            trim: true,
        },
        heading: {
            type: String,
            trim: true,
            required: true
        },
        factoryInfo: {
            type: String,
            trim: true,
            required: true
        },
        skills: {
            type: String,
            trim: true,
        },
        addressLine1: {
            type: String,
            trim: true,
            required: true
        },
        addressLine2: {
            type: String,
            trim: true,
        },
        certifications: { 
            type: Array
        },
        multiphotos:{
            type:Array
        },
        /* status: {
            type: Number,
            default: 0 // 0-Active, 1-Deactivate
        } */
    },
    {timestamps:true}
)

export default mongoose.model('Manufacturer', manufacturerSchema)