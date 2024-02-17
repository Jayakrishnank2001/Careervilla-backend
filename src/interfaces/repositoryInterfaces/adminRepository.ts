import Admin from "../entityInterfaces/admin"
import { UpdateResult } from "mongodb"

interface IAdminRepository{
    adminLogin(username:string,password:string):Promise<Admin|null>

}

export default IAdminRepository