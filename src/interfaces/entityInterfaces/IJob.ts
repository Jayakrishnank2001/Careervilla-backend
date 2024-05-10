import { ObjectId } from "mongoose"

interface Job{
    id?: string,
    companyId?: ObjectId,
    jobTitle: string,
    jobDescription?: string,
    email?:string,
    salary?: string,
    specialisms?:string,
    jobType?: string,
    experience?: string,
    gender?: string,
    isBlocked?:boolean,
    applicationDeadline?: string,
    addressId?: ObjectId;
    status?: string,
    postedBy?: ObjectId,
    industry?: ObjectId,
    postedAt?:string
}
export default Job


export interface searchQuery{
    jobTitle: string
    location: string
    experience: string
    industryName: string
    jobType:string
}