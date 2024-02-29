import Employer from "../entityInterfaces/employer"
import Jobseeker from "../entityInterfaces/jobseeker"
import { IEmployersAndCount, IJobseekersAndCount } from "../serviceInterfaces/adminService"

export type AllResTypes = IJobseekersAndCount | IEmployersAndCount | Jobseeker | Jobseeker[] | Employer | Employer[] | null


export interface IApiRes<T extends AllResTypes> {
    status: number,
    message: string,
    data: T
}