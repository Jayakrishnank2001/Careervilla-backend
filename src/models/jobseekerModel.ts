import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { AppliedJob, SavedJob } from "../interfaces/entityInterfaces/IJobseeker";

export interface JobseekerInterface extends Document {
    _id: ObjectId,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: string,
    isBlocked: boolean,
    gender: string,
    role: string | null,
    image: string | null,
    resume: string | undefined,
    location: string | null
    savedJobs: SavedJob[];
    appliedJobs: AppliedJob[];
}

const jobseekerSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String
    },
    role: {
        type: String
    },
    image: {
        type: String
    },
    resume: {
        type: String
    },
    location: {
        type: String
    },
    savedJobs: [
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
            savedAt: { type: Date, default: Date.now }
        }
    ],
    appliedJobs: [
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
            appliedAt: { type: Date, default: Date.now }
        }
    ]
})

const JobseekerModel = mongoose.model<JobseekerInterface>('Jobseeker', jobseekerSchema)
export default JobseekerModel