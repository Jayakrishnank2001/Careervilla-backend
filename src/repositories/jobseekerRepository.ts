import Jobseeker from "../interfaces/entityInterfaces/jobseeker";
import IJobseekerRepository from "../interfaces/repositoryInterfaces/jobseekerRepository";
import JobseekerModel from "../models/jobseekerModel";


class JobseekerRepository implements IJobseekerRepository {
   async jobseekerLogin(email: string): Promise<Jobseeker | null> {
      try {
         const jobseeker = await JobseekerModel.findOne({ email: email })
         return jobseeker as Jobseeker
      } catch (error) {
         console.error(error)
         return null
      }
   }

   async emailExistCheck(email: string): Promise<Jobseeker | null>{
      try {
         const jobseekerFound = await JobseekerModel.findOne({ email })
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





   
}

export default JobseekerRepository