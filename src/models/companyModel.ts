import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface CompanyInterface extends Document{
    _id: ObjectId,
    companyName: string,
    website: string,
    addressId: ObjectId,
    companySize: string,
    industry: string,
    email: string,
    foundedYear: number,
    description: string,
    logo: string
}

const companySchema: Schema = new Schema({
    companyName: {
        type: String,
        required:true
    },
    website: {
        type:String
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    companySize: {
        type:String
    },
    industry: {
        type:String
    },
    email: {
        type:String
    },
    foundedYear: {
        type:Number
    },
    description: {
        type:String
    },
    logo: {
        type:String
    }
})

const CompanyModel = mongoose.model<CompanyInterface>('Company', companySchema)
export default CompanyModel