import Review from "../entityInterfaces/IReview"


interface IReviewRepository{
    saveReview(reviewData: Review): Promise<Review | null>
    getAllReviews(jobseekerId: string, companyId: string): Promise<Review[]>
    deleteReview(reviewId: string): Promise<boolean>
    

}
export default IReviewRepository