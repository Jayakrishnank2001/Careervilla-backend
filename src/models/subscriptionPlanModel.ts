import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface SubscriptionPlanInterface extends Document{
    _id: ObjectId,
    duration: string,
    amount: number,
    planName: string,
    status:string
}

const subscriptionPlanSchema: Schema = new Schema({
    duration: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    planName: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true
    }
})

const SubscriptionPlanModel = mongoose.model<SubscriptionPlanInterface>('SubscriptionPlan', subscriptionPlanSchema)
export default SubscriptionPlanModel