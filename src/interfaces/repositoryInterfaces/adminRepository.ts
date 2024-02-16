import Admin from "../entityInterfaces/admin"
import { UpdateResult } from "mongodb"

interface AdminRepository{
    adminLogin(username:string,password:string):Promise<Admin|null>

}
export default AdminRepository