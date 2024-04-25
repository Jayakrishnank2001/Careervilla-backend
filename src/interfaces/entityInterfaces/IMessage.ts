import { ObjectId } from "mongoose"

interface Message{
    id?: string
    chatId?: ObjectId,
    senderId?: ObjectId,
    receiverId?: ObjectId,
    message?: string,
    status?: string,
    time?: string
}

export default Message