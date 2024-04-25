import { Request, Response } from "express";
import ReviewService from "../services/reviewService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class ReviewController {
    constructor(private reviewService: ReviewService) { }

    async postReview(req: Request, res: Response) {
        try {
            const addReview = await this.reviewService.saveReview(req.body)
            res.status(STATUS_CODES.OK).json(addReview)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async getAllReviews(req: Request, res: Response) {
        try {
            const reviews = await this.reviewService.getAllReviews(req.query.jobseekerId as string, req.query.companyId as string)
            res.status(STATUS_CODES.OK).json(reviews)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async deleteReview(req: Request, res: Response) {
        try {
            const deleteReview = await this.reviewService.deleteReview(req.params.reviewId)
            res.status(STATUS_CODES.OK).json(deleteReview)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }




}
export default ReviewController