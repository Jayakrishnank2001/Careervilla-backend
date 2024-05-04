import { ObjectId, model } from "mongoose";
import Job, { searchQuery } from "../interfaces/entityInterfaces/IJob";
import IJobRepository from "../interfaces/repositoryInterfaces/IJobRepository";
import JobModel from "../models/jobModel";
import { populate } from "dotenv";



class JobRepository implements IJobRepository {
    async saveJob(jobData: Job, companyId: string, addressId: string, employerId: string, industryId: string): Promise<Job | null> {
        try {
            const newJob = new JobModel({
                addressId: addressId,
                companyId: companyId,
                postedBy: employerId,
                industry: industryId,
                ...jobData
            })
            const savedJob = await newJob.save()
            return savedJob as Job
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllJobs(page: number, pageSize: number, companyId: string, searchQuery: searchQuery): Promise<Job[]> {
        try {
            if (companyId == 'undefined') {
                const jobRegex = new RegExp(searchQuery.jobTitle, 'i');
                const experienceRegex = new RegExp(searchQuery.experience, 'i');
                const locationRegex = new RegExp(searchQuery.location, 'i');
                const industryRegex = new RegExp(searchQuery.industryName,'i');
                const jobTypeRegex = new RegExp(searchQuery.jobType, 'i');
                const jobs = await JobModel.find({
                    $and: [
                        { jobTitle: { $regex: jobRegex } },
                        { experience: { $regex: experienceRegex } },
                        { jobType: { $regex: jobTypeRegex } },
                        { isBlocked: false },
                        { status: 'Active' },
                        { applicationDeadline: { $gte: new Date() } }, 
                    ]
                })
                .populate({
                    path: 'industry',
                    match: { industryName: { $regex: industryRegex} },
                })
                    .populate({
                        path: 'addressId',
                        match: {
                            $or: [
                                { city: { $regex: locationRegex } },
                                { state: { $regex: locationRegex } },
                            ],
                        },
                    })

                    .populate('companyId')
                    .sort({ _id: -1 })
                    .exec();
                const filteredJobs = jobs.filter(job => job.addressId && job.industry !== null);
                const paginatedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);
                return paginatedJobs.map((job) => job.toObject());
            } else {
                const jobs = await JobModel.find({ isBlocked: false, status: 'Active', companyId: companyId }).populate('companyId').populate('addressId')
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .exec()
                return jobs.map((job) => job.toObject())
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async blockReportedJob(jobId: string): Promise<void> {
        try {
            const job = await JobModel.findById({ _id: jobId })
            if (job !== null) {
                job.isBlocked = !job.isBlocked
                await job.save()
            }
        } catch (error) {
            throw new Error('Error occured')
        }
    }

    async findJobById(jobId: ObjectId): Promise<Job | null> {
        try {
            const job = await JobModel.findById(jobId).populate('companyId addressId postedBy')
            return job
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateJob(jobData: Job, jobId: string, industryId: string): Promise<Job | null> {
        try {
            const job = await JobModel.findByIdAndUpdate(jobId,
                { ...jobData, industry: industryId },
                { new: true })
            return job
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateJobStatus(jobId: string): Promise<void> {
        try {
            const job = await JobModel.findByIdAndUpdate(jobId)
            if (job !== null) {
                job.status = job.status == 'Active' ? 'Inactive' : 'Active'
                await job.save()
            }
        } catch (error) {
            throw new Error('Error occurred');
        }
    }



}
export default JobRepository