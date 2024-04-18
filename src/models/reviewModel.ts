import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ReviewInterface extends Document {
    _id: ObjectId,
    jobseekerId: ObjectId,
    companyId: ObjectId,
    rating: number,
    createdAt: string,
    comment: string
}

const reviewSchema: Schema = new Schema({
    jobseekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobseeker'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    rating: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    }
})

const ReviewModel = mongoose.model<ReviewInterface>('Review', reviewSchema)
export default ReviewModel