import { ObjectId } from "mongoose";
import Jobseeker from "../interfaces/entityInterfaces/IJobseeker";
import IJobseekerRepository from "../interfaces/repositoryInterfaces/IJobseekerRepository";
import JobseekerModel from "../models/jobseekerModel";
import Job from "../interfaces/entityInterfaces/IJob";


class JobseekerRepository implements IJobseekerRepository {

   async emailExistCheck(email: string): Promise<Jobseeker | null> {
      try {
         const jobseekerFound = await JobseekerModel.findOne({ email: email })
         return jobseekerFound as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async saveJobseeker(jobseeker: Jobseeker): Promise<Jobseeker | null> {
      try {
         const newJobseeker = new JobseekerModel(jobseeker)
         await newJobseeker.save()
         return newJobseeker as Jobseeker
      } catch (error) {
         console.error(Error)
         return null
      }
   }

   async updatePassword(email: string, newPassword: string): Promise<boolean> {
      try {
         const updatedJobseeker = await JobseekerModel.findOneAndUpdate(
            { email: email },
            { password: newPassword },
            { new: true }
         )
         return !!updatedJobseeker
      } catch (error) {
         console.error(Error)
         return false
      }
   }

   async getJobseekerData(jobseekerId: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findById(jobseekerId)
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(Error)
         return null
      }
   }

   async updatePhoneNumber(jobseekerId: string, phoneNumber: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId, { phoneNumber: phoneNumber }, { new: true })
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async updateLocation(jobseekerId: string, location: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId, { location: location }, { new: true })
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async updatePhoto(jobseekerId: string, url: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId, { image: url }, { new: true })
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async addResume(jobseekerId: string, url: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId, { resume: url }, { new: true })
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async deleteResume(jobseekerId: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findById(jobseekerId)
         if (!jobseeker) {
            return null
         }
         jobseeker.resume = undefined
         const updatedJobseeker = await jobseeker.save()
         return updatedJobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async saveJob(jobseekerId: string, jobId: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId,
            { $push: { savedJobs: { jobId: jobId } } },
            { new: true }
         )
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async unsaveJob(jobseekerId: string, jobId: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId,
            { $pull: { savedJobs: { jobId: jobId } } },
            { new: true }
         )
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async applyJob(jobseekerId: ObjectId, jobId: ObjectId): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findByIdAndUpdate(jobseekerId,
            { $push: { appliedJobs: { jobId: jobId } } },
            { new: true }
         )
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async getSavedJobs(jobseekerId: string): Promise<Job[]> {
      try {
         const jobseeker = await JobseekerModel.findById(jobseekerId).populate('savedJobs.jobId')
         if (!jobseeker) {
            return []
         }
         return jobseeker?.savedJobs.map(savedJob => savedJob.jobId) as Job[]
      } catch (error) {
         console.error(error)
         throw new Error()
      }
   }

   async getAppliedJobs(jobseekerId: string): Promise<Job[]> {
      try {
         const jobseeker = await JobseekerModel.findById(jobseekerId).populate('appliedJobs.jobId')
         if (!jobseeker) {
            return []
         }
         return jobseeker.appliedJobs.map(appliedJob=>appliedJob.jobId) as Job[]
      } catch (error) {
         console.error(error)
         return []
      }
   }






}

export default JobseekerRepository