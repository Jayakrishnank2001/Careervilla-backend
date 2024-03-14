import { IJob } from "../common/ICommon";

export interface IJobService{
  saveJob(jobData: IJob): Promise<IJobRes>

}

export interface IJobRes {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
}