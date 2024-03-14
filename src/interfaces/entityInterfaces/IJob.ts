import { ObjectId } from "mongoose"

interface Job{
    id?: string,
    companyId?: ObjectId,
    jobTitle?: string,
    jobDescription?: string,
    email?:string,
    salary?: string,
    specialisms?:string,
    jobType?: string,
    experience?: string,
    gender?: string,
    applicationDeadline?: string,
    addressId?: ObjectId;
}

export default Job