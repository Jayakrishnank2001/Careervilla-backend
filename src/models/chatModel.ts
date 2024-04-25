import mongoose, { ObjectId, Document, Schema } from "mongoose";

export interface ChatInterface extends Document{
    _id: ObjectId,
    participants: ObjectId[],
    createdAt:string
}

const chatSchema: Schema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required:true
        }
    ],
    createdAt: {
        type: Date,
        default:Date.now
    }
})

const ChatModel = mongoose.model<ChatInterface>('Chat', chatSchema)
export default ChatModel