import Job from "../entityInterfaces/IJob"


interface IJobRepository{
    saveJob(jobData:Job,addressId:string,companyId:string):Promise<Job|null>
}
export default IJobRepository