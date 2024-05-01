import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IndustryInterface extends Document {
    _id: ObjectId
    industryName: string
    description: string
    dateAdded: string
    status: string
}

const industrySchema: Schema = new Schema({
    industryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
})

const IndustryModel = mongoose.model<IndustryInterface>('Industry', industrySchema)
export default IndustryModel