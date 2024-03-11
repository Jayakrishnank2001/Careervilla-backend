import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface AddressInterface extends Document{
    _id: ObjectId,
    address: string,
    city: string,
    state: string,
    country:string
}

const addressSchema: Schema = new Schema({
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    }
})

const AddressModel = mongoose.model<AddressInterface>('Address', addressSchema)
export default AddressModel