import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface JobInterface extends Document {
    _id: ObjectId,
    companyId: ObjectId,
    jobTitle: string,
    jobDescription: string,
    email: string,
    salary: string,
    specialisms: string,
    jobType: string,
    experience: string,
    gender: string,
    isBlocked: boolean,
    applicationDeadline: string,
    addressId: ObjectId,
    status: string,
    postedBy: ObjectId,
    industry: ObjectId
    postedAt:string
}

const jobSchema: Schema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String
    },
    email: {
        type: String
    },
    salary: {
        type: String
    },
    specialisms: {
        type: String
    },
    jobType: {
        type: String
    },
    experience: {
        type: String
    },
    gender: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    applicationDeadline: {
        type: Date
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    status: {
        type: String,
        default: 'Active'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
    postedAt: {
        type: Date,
        default:Date.now
    }
})

const JobModel = mongoose.model<JobInterface>('Job', jobSchema)
export default JobModel