import { IResponse } from "../common/ICommon";

export interface IJobApplicationService{
    applyJob(resume:string,jobId:string,jobseekerId:string):Promise<IResponse>
} 

