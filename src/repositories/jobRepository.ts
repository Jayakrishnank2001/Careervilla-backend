import { ObjectId } from "mongoose";
import Job from "../interfaces/entityInterfaces/IJob";
import IJobRepository from "../interfaces/repositoryInterfaces/IJobRepository";
import JobModel from "../models/jobModel";



class JobRepository implements IJobRepository {
    async saveJob(jobData: Job, companyId: string, addressId: string, employerId: string): Promise<Job | null> {
        try {
            const newJob = new JobModel({
                addressId: addressId,
                companyId: companyId,
                postedBy: employerId,
                ...jobData
            })
            const savedJob = await newJob.save()
            return savedJob as Job
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllJobs(page: number, pageSize: number, companyId: string, jobTitle: string, location: string, experience: string): Promise<Job[]> {
        try {
            if (companyId == 'undefined') {
                const jobRegex = new RegExp(jobTitle, 'i');
                const experienceRegex = new RegExp(experience, 'i');
                const locationRegex = new RegExp(location, 'i');
                const jobs = await JobModel.find({
                    $and: [
                        { jobTitle: { $regex: jobRegex } },
                        { experience: { $regex: experienceRegex } },
                        { isBlocked: false },
                        { status: 'Active' },
                    ],
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
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .exec();
                const filteredJobs = jobs.filter(job => job.addressId);
                return filteredJobs.map((job) => job.toObject());
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

    async updateJob(jobData: Job, jobId: string): Promise<Job | null> {
        try {
            const job = await JobModel.findByIdAndUpdate(jobId, { ...jobData }, { new: true })
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