import { ObjectId } from "mongoose";
import { IJob } from "../common/ICommon";
import Job from "../entityInterfaces/IJob";

export interface IJobService{
  saveJob(jobData: IJob,employerId:string): Promise<IJobRes>
  getAllJobs():Promise<Job[]>
  getJobDetails(jobId: string): Promise<Job | null>
  updateJob(jobData: IJob, jobId: string, addressId: string): Promise<IJobRes>
  updateJobStatus(jobId: string): Promise<IJobRes>
  
}

export interface IJobRes {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
}