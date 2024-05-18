import { STATUS_CODES } from "../constants/httpStatusCodes";
import { IResponse } from "../interfaces/common/ICommon";
import Chat from "../interfaces/entityInterfaces/IChat";
import Employer from "../interfaces/entityInterfaces/IEmployer";
import Jobseeker from "../interfaces/entityInterfaces/IJobseeker";
import Message from "../interfaces/entityInterfaces/IMessage";
import { IMessageService } from "../interfaces/serviceInterfaces/IMessageService";
import ChatRepository from "../repositories/chatRepository";
import EmployerRepository from "../repositories/employerRepository";
import JobseekerRepository from "../repositories/jobseekerRepository";
import MessageRepository from "../repositories/messageRepository";


class MessageService implements IMessageService {

    constructor(private messageRepository: MessageRepository,
        private chatRepository: ChatRepository,
        private jobseekerRepository: JobseekerRepository,
        private employerRepository: EmployerRepository) { }

    async sendMessage(senderId: string, receiverId: string, message: string): Promise<IResponse> {
        try {
            let chat = await this.chatRepository.findChatById(senderId, receiverId)
            if (!chat) {
                chat = await this.chatRepository.createChat(senderId, receiverId)
            }
            await this.messageRepository.createMessage(chat.id, senderId, receiverId, message)
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
            const chat = await this.chatRepository.findChatById(senderId, receiverId)
            if (!chat) {
                return []
            }
            const messages = await this.messageRepository.getAllMessages(chat.id)
            return messages
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllChats(userId: string, role: string): Promise<Chat[]> {
        try {
            const chats = await this.chatRepository.getAllChats(userId, role)
            return await this.messageRepository.getLastMessage(chats)
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getReceiverDetails(userId: string, role: string): Promise<Jobseeker | Employer> {
        try {
            if (role === 'jobseeker') {
                const receiverDetails = await this.employerRepository.getEmployerData(userId)
                if (receiverDetails)
                    return receiverDetails
            } else {
                const receiverDetails = await this.jobseekerRepository.getJobseekerData(userId)
                if (receiverDetails)
                    return receiverDetails
            }
            throw new Error("Receiver details not found");
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }



}
export default MessageService