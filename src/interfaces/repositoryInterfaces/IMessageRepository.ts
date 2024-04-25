import Message from "../entityInterfaces/IMessage"

interface IMessageRepository{
    createMessage(chatId: string, senderId: string, receiverId: string, message: string): Promise<Message>
    getAllMessages(chatId: string): Promise<Message[]>
    

}
export default IMessageRepository