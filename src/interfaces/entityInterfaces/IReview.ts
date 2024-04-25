import { ObjectId } from "mongoose"

interface Review {
    id?: string,
    jobseekerId?: ObjectId,
    companyId?: ObjectId,
    rating?: number,
    createdAt?: string,
    comment?: string
}
export default Review