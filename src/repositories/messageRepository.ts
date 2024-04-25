import Message from "../interfaces/entityInterfaces/IMessage";
import IMessageRepository from "../interfaces/repositoryInterfaces/IMessageRepository";
import MessageModel from "../models/messageModel";


class MessageRepository implements IMessageRepository {

    async createMessage(chatId: string, senderId: string, receiverId: string, message: string): Promise<Message> {
        try {
            const newMessage = new MessageModel({
                chatId,
                senderId,
                receiverId,
                message
            })
            await newMessage.save()
            return newMessage
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async getAllMessages(chatId: string): Promise<Message[]> {
        try {
            const messages = await MessageModel.find({ chatId: chatId }).sort({ time: 1 })
            return messages
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

}
export default MessageRepository