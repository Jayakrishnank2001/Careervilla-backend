import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface EmployerInterface extends Document {
    _id: ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    location: string | null,
    phoneNumber: string,
    isBlocked: boolean,
    isSubscribed: boolean,
    planExpiresAt:string,
    image:string | null
    password: string,
    companyId: ObjectId
}

const employerSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isSubscribed: {
        type: Boolean,
        default:false
    },
    planExpiresAt: {
        type:Date
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
})

const EmployerModel = mongoose.model<EmployerInterface>('Employer', employerSchema)
export default EmployerModel