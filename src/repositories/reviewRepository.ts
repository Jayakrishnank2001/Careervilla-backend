import Review from "../interfaces/entityInterfaces/IReview";
import IReviewRepository from "../interfaces/repositoryInterfaces/IReviewRepository";
import ReviewModel from "../models/reviewModel";


class ReviewRepository implements IReviewRepository {

    async saveReview(reviewData: Review): Promise<Review | null> {
        try {
            const review = new ReviewModel({
                ...reviewData
            })
            const savedReview = await review.save()
            return savedReview as Review
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllReviews(jobseekerId: string, companyId: string): Promise<Review[]> {
        try {
            const searchQuery=(jobseekerId=='undefined')?{companyId:companyId}:{jobseekerId:jobseekerId}
            const reviews = await ReviewModel.find(searchQuery).populate('jobseekerId').populate('companyId')
            return reviews
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        try {
            const result = await ReviewModel.findByIdAndDelete(reviewId)
            return !!result
        } catch (error) {
            console.error(error)
            return false
        }
    }




}
export default ReviewRepository