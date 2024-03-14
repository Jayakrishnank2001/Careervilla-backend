import { ObjectId } from "mongoose";

interface Company{
    id?: string,
    companyName?: string,
    website?: string,
    companySize?: string,
    industry?: string,
    email?: string,
    foundedYear?: number,
    description?: string,
    logo?: string,
    addressId?: ObjectId;

}

export default Company