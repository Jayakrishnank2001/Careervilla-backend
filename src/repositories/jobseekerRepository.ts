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
}

export default JobseekerRepository