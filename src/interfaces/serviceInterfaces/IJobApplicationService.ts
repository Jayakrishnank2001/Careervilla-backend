import { IRes } from "../common/ICommon";
import JobApplication from "../entityInterfaces/IJobApplication";

export interface IJobApplicationService{
    applyJob(data:JobApplication):Promise<IRes>
} 

