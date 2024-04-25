import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface MessageInterface extends Document {
    _id: ObjectId,
    chatId: ObjectId,
    senderId: ObjectId,
    receiverId: ObjectId,
    message: string,
    status: string,
    time: string
}

const messageSchema: Schema = new Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        default: 'unread'
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const MessageModel = mongoose.model<MessageInterface>('Message', messageSchema)
export default MessageModel

