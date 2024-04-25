import { STATUS_CODES } from "../constants/httpStatusCodes";
import { IResponse } from "../interfaces/common/ICommon";
import Message from "../interfaces/entityInterfaces/IMessage";
import { IMessageService } from "../interfaces/serviceInterfaces/IMessageService";
import ChatRepository from "../repositories/chatRepository";
import MessageRepository from "../repositories/messageRepository";


class MessageService implements IMessageService {

    constructor(private messageRepository: MessageRepository,
        private chatRepository: ChatRepository) { }

    async sendMessage(senderId: string, receiverId: string, message: string): Promise<IResponse> {
        try {
            const chat = await this.chatRepository.findOrCreateChat(senderId, receiverId)
            const newMessage = await this.messageRepository.createMessage(chat.id, senderId, receiverId, message)
            return {
                status: STATUS_CODES.OK,
                data: {
                    success: true,
                    message: 'Message sent successfully'
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllMessages(senderId: string, receiverId: string): Promise<Message[]> {
        try {
            const chat = await this.chatRepository.findOrCreateChat(senderId, receiverId)
            const messages = await this.messageRepository.getAllMessages(chat.id)
            return messages
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }



}
export default MessageService