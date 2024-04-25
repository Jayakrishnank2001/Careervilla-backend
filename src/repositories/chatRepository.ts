import Chat from "../interfaces/entityInterfaces/IChat";
import IChatRepository from "../interfaces/repositoryInterfaces/IChatRepository";
import ChatModel from "../models/chatModel";


class ChatRepository implements IChatRepository {

    async findOrCreateChat(senderId: string, receiverId: string): Promise<Chat> {
        try {
            let chat = await ChatModel.findOne({ participants: { $all: [senderId, receiverId] } })
            if (!chat) {
                chat = new ChatModel({ participants: [senderId, receiverId] })
                await chat.save()
            }
            return chat as Chat
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }


}
export default ChatRepository