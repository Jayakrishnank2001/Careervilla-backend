import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface EmployerInterface extends Document {
    _id: ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    location: string | null,
    phoneNumber: string,
    isBlocked: boolean,
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
        required: true
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
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
})

const EmployerModel = mongoose.model<EmployerInterface>('Employer', employerSchema)
export default EmployerModel