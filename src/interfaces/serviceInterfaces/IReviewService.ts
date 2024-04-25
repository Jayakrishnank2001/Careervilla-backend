import { IRes } from "../common/ICommon";
import Review from "../entityInterfaces/IReview";


export interface IReviewService{
    saveReview(reviewData: Review): Promise<IRes>
    getAllReviews(jobseekerId: string, companyId: string): Promise<Review[]>
    deleteReview(reviewId: string): Promise<IRes>
    
}