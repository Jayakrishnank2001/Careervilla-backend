import Employer from "../entityInterfaces/employer"

interface IEmployerRepository {
    emailExistCheck(email: string): Promise<Employer | null>
    saveEmployer(employer:Employer): Promise<Employer | null>
    updatePassword(email:string,newPassword:string): Promise<boolean>

}

export default IEmployerRepository