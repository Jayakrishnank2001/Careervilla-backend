import ReportedJob from "../interfaces/entityInterfaces/IReportedJob";
import IReportedJobRepository from "../interfaces/repositoryInterfaces/IReportedJobRepository";
import JobModel from "../models/jobModel";
import ReportedJobModel from "../models/reportedJobModel";


class ReportedJobRepository implements IReportedJobRepository {

    async reportJob(data: ReportedJob): Promise<ReportedJob | null> {
        try {
            const reportJob = new ReportedJobModel({
                reportedAt: Date.now(),
                ...data
            })
            const reportedJob = await reportJob.save()
            return reportedJob
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllReportedJobs(page: number, limit: number, searchQuery: string): Promise<ReportedJob[]> {
        try {
            const regex = new RegExp(searchQuery, 'i');
            const result = await ReportedJobModel.find({
                $or: [
                    { status: { $regex: regex } },
                ]
            })
                .populate('jobId companyId reportedBy')
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            return result as ReportedJob[];
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

    async getReportedJobsCount(searchQuery: string): Promise<number> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            return await ReportedJobModel.find({
                $or: [
                    { status: { $regex: regex } },
                ]
            }).countDocuments()
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

    async changeReportJobStatus(reportJobId: string): Promise<void> {
        try {
            const job = await ReportedJobModel.findById({ _id: reportJobId })
            if (job !== null) {
                job.status = 'Resolved'
                await job.save()
            }
        } catch (error) {
            throw new Error('Error occured')
        }
    }

    async reportedJobDetails(jobId: string): Promise<ReportedJob | null> {
        try {
            const job = await ReportedJobModel.findById({ _id: jobId }).populate('jobId companyId')
            return job as ReportedJob
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

}
export default ReportedJobRepository