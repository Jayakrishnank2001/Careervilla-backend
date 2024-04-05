import { ObjectId } from "mongoose"

interface JobApplication{
    id?: string,
    jobseekerId: ObjectId,
    jobId: ObjectId,
    createdAt?: string,
    resume?: string,
    status?: string,
    qualification?: string,
    experience?:number
}
export default JobApplication