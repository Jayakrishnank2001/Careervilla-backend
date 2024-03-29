import Jobseeker from "../interfaces/entityInterfaces/IJobseeker";
import IJobseekerRepository from "../interfaces/repositoryInterfaces/IJobseekerRepository";
import JobseekerModel from "../models/jobseekerModel";


class JobseekerRepository implements IJobseekerRepository {

   async emailExistCheck(email: string): Promise<Jobseeker | null>{
      try {
         const jobseekerFound = await JobseekerModel.findOne({ email:email })
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
            { new:true}
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





   
}

export default JobseekerRepository