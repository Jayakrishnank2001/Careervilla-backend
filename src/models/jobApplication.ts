import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface JobApplicationInterface extends Document{
    _id: ObjectId,
    jobseekerId: ObjectId,
    jobId: ObjectId,
    createdAt: string,
    resume: string,
    status:string
}

const jobApplicationSchema: Schema = new Schema({
    jobseekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Jobseeker'
    },
    createdAt: {
        types: Date,
        
    },
    resume: {
        types: String,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job'
    },
    status: {
        type: String,
        default:'pending'
    }
})

const JobApplicationModel = mongoose.model<JobApplicationInterface>('JobApplication', jobApplicationSchema)
export default JobApplicationModel