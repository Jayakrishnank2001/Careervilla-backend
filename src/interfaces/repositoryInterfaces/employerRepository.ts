import Employer from "../entityInterfaces/employer"

interface IEmployerRepository{
    employerLogin(email:string):Promise<Employer|null>

}

export default IEmployerRepository