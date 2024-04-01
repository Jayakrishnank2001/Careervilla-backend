import { ObjectId } from "mongoose";

interface ReportedJob{
    id?: string,
    jobId?: ObjectId,
    reportedAt?: string,
    reason?: string,
    companyId?: ObjectId,
    status?: string,
    reportedBy?: ObjectId,
    description?:string
}
export default ReportedJob