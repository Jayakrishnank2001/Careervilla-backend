import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface MessageInterface extends Document{
    _id: ObjectId,
    jobseekerId: ObjectId,
    employerId: ObjectId,
    message: string,
    status:string,
    time: string
}

const messageSchema: Schema = new Schema({
    jobseekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobseeker'
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    message: {
        type:String
    },
    status: {
        type:String
    },
    time: {
        type:String
    }
})

const MessageModel = mongoose.model<MessageInterface>('Message', messageSchema)
export default MessageModel

