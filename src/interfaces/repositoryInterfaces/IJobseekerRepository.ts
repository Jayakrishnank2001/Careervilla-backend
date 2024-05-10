import { ObjectId } from "mongoose";
import Jobseeker from "../entityInterfaces/IJobseeker";
import Job from "../entityInterfaces/IJob";

interface IJobseekerRepository {
    emailExistCheck(email: string): Promise<Jobseeker | null>
    saveJobseeker(jobseeker: Jobseeker): Promise<Jobseeker | null>
    updatePassword(email: string, newPassword: string): Promise<boolean>
    getJobseekerData(jobseekerId: string): Promise<Jobseeker | null>
    updatePhoneNumber(jobseekerId: string, phoneNumber: string): Promise<Jobseeker | null>
    updateLocation(jobseekerId: string, location: string): Promise<Jobseeker | null>
    updatePhoto(jobseekerId: string, url: string): Promise<Jobseeker | null>
    addResume(jobseekerId: string, url: string): Promise<Jobseeker | null>
    deleteResume(jobseekerId: string): Promise<Jobseeker | null>
    saveJob(jobseekerId: string, jobId: string): Promise<Jobseeker | null>
    unsaveJob(jobseekerId: ObjectId, jobId: ObjectId): Promise<Jobseeker | null>
    appliedJob(jobseekerId: ObjectId, jobId: ObjectId): Promise<Jobseeker | null>
    getSavedJobs(jobseekerId: string): Promise<Job[]>
    withdrawApplication(jobId: string, jobseekerId: string): Promise<Jobseeker | null>
    addRecentWork(work: string, jobseekerId: string): Promise<Jobseeker | null>
    addEducation(education: string, jobseekerId: string): Promise<Jobseeker | null>
    addSalary(salary: string, jobseekerId: string): Promise<Jobseeker | null>
    addJobTypes(jobTypes: [string], jobseekerId: string): Promise<Jobseeker | null>
    addSkills(skills: string[], jobseekerId: string): Promise<Jobseeker | null>
    addLanguages(languages: string[], jobseekerId: string): Promise<Jobseeker | null>
    addJobTitles(jobTitles: string[], jobseekerId: string): Promise<Jobseeker | null>
    getPreferencedJobs(jobseekerId: string, jobs: Job[], page: number, pageSize: number): Promise<Job[]>
    
    
}

export default IJobseekerRepository