import { model } from "mongoose";
import Chat from "../interfaces/entityInterfaces/IChat";
import IChatRepository from "../interfaces/repositoryInterfaces/IChatRepository";
import ChatModel from "../models/chatModel";


class ChatRepository implements IChatRepository {

    async findChatById(senderId: string, receiverId: string): Promise<Chat> {
        try {
            let chat = await ChatModel.findOne({ participants: { $all: [senderId, receiverId] } })
            return chat as Chat
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async createChat(senderId: string, receiverId: string): Promise<Chat> {
        try {
            const chat = new ChatModel({ participants: [senderId, receiverId] })
            await chat.save()
            return chat as Chat
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async getAllChats(userId: string, role: string): Promise<Chat[]> {
        try {
            const model = (role === 'employer') ? 'Jobseeker' : 'Employer'
            const chats = await ChatModel.find({ participants: userId })
                .populate({ path: 'participants', model: model })
            return chats as Chat[]
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }


}
export default ChatRepository