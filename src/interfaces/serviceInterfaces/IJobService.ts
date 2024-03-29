import { IJob } from "../common/ICommon";
import Job from "../entityInterfaces/IJob";

export interface IJobService{
  saveJob(jobData: IJob): Promise<IJobRes>
  getAllJobs():Promise<Job[]>


}

export interface IJobRes {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
}