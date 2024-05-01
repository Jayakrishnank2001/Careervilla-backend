import Employer from "../entityInterfaces/IEmployer"
import Industry from "../entityInterfaces/IIndustry"
import Jobseeker from "../entityInterfaces/IJobseeker"
import ReportedJob from "../entityInterfaces/IReportedJob"
import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan"
import { IEmployersAndCount, IJobseekersAndCount } from "../serviceInterfaces/IAdminService"
import { IIndustriesAndCount } from "../serviceInterfaces/IIndustryService"
import { IReportedJobsAndCount } from "../serviceInterfaces/IReportedJobService"
import { IPlansAndCount } from "../serviceInterfaces/ISubscriptionService"

export type AllResTypes = IJobseekersAndCount | IEmployersAndCount | Jobseeker | Jobseeker[] | Employer | Employer[] | null | ReportedJob[] | IReportedJobsAndCount | 
    Industry | Industry[] | IIndustriesAndCount | SubscriptionPlan | SubscriptionPlan[] | IPlansAndCount
        


export interface IApiRes<T extends AllResTypes> {
    status: number,
    message: string,
    data: T
}

export interface ICompany {
    id?: string,
    companyName?: string,
    website?: string,
    companySize?: string,
    industry?: string,
    email?: string,
    foundedYear?: number,
    description?: string,
    logo?: string
    address?: string,
    state?: string,
    city?: string,
    country?: string
}

export interface IJob {
    id?: string,
    companyName: string,
    jobDescription?: string,
    email?: string,
    jobType?: string,
    salary?: string,
    specialisms?: string,
    experience?: string,
    gender?: string,
    industry?: string,
    applicationDeadline?: string,
    address?: string,
    state?: string,
    city?: string,
    country?: string

}

export interface paymentToken {
    id: string,
    email: string
}

export interface IResponse {
    status: number;
    data: {
        success: boolean;
        message: string;
    };
}

export interface IRes {
    success: boolean,
    message: string
}
