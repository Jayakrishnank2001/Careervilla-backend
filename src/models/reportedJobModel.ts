import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ReportedJobInterface extends Document{
    _id: ObjectId,
    jobId: ObjectId,
    reportedAt: string,
    reason: string,
    companyId: ObjectId,
    status: string,
    reportedBy: ObjectId,
    description:string
}

const reportedJobSchema: Schema = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job'
    },
    reportedAt: {
        type: Date
    },
    reason: {
        type:String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    status: {
        type: String,
        default:'Pending'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Jobseeker'
    },
    description: {
        type:String
    }
})

const ReportedJobModel = mongoose.model<ReportedJobInterface>('ReportedJob', reportedJobSchema)
export default ReportedJobModel