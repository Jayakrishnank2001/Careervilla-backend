import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface JobApplicationInterface extends Document {
    _id: ObjectId,
    jobseekerId: ObjectId,
    jobId: ObjectId,
    createdAt: string,
    resume: string,
    status: string,
    qualification: string,
    experience: number
    rejectionReason:string
}

const jobApplicationSchema: Schema = new Schema({
    jobseekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobseeker'
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    resume: {
        type: String,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    status: {
        type: String,
        enum: ['Approved', 'Rejected', 'Applied'],
        default:'Applied'
    },
    qualification: {
        type: String
    },
    experience: {
        type:Number
    },
    rejectionReason: {
        type:String
    }
})

const JobApplicationModel = mongoose.model<JobApplicationInterface>('JobApplication', jobApplicationSchema)
export default JobApplicationModel