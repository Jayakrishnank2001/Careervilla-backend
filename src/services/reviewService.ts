import { IRes } from "../interfaces/common/ICommon";
import Review from "../interfaces/entityInterfaces/IReview";
import { IReviewService } from "../interfaces/serviceInterfaces/IReviewService";
import ReviewRepository from "../repositories/reviewRepository";


class ReviewService implements IReviewService {
    constructor(private reviewRepository: ReviewRepository) { }

    async saveReview(reviewData: Review): Promise<IRes> {
        try {
            await this.reviewRepository.saveReview(reviewData)
            return {
                success: true,
                message: 'Review added successfully'
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllReviews(jobseekerId: string, companyId: string): Promise<Review[]> {
        try {
            const reviews = await this.reviewRepository.getAllReviews(jobseekerId, companyId)
            return reviews
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async deleteReview(reviewId: string): Promise<IRes> {
        try {
            await this.reviewRepository.deleteReview(reviewId)
            return {
                success: true,
                message: 'Review Deleted'
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }




}
export default ReviewService