import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface JobInterface extends Document{
    _id: ObjectId,
    companyId: ObjectId,
    jobTitle: string,
    jobDescription: string,
    email:string,
    salary: string,
    specialisms:string,
    jobType: string,
    experience: string,
    gender: string,
    applicationDeadline: Date,
    addressId:ObjectId
}

const jobSchema: Schema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    jobTitle: {
        type: String,
        required:true
    },
    jobDescription: {
        type:String
    },
    email: {
        type:String
    },
    salary: {
        type:String
    },
    specialisms: {
        type:String
    },
    jobType: {
        type:String
    },
    experience: {
        type:String
    },
    gender: {
        type:String
    },
    applicationDeadline: {
        type:Date
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address'
    }
})

const JobModel = mongoose.model<JobInterface>('Job', jobSchema)
export default JobModel