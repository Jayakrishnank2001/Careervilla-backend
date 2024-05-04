import Chat from "../entityInterfaces/IChat"


interface IChatRepository{
    findChatById(senderId: string, receiverId: string): Promise<Chat>
    createChat(senderId: string, receiverId: string): Promise<Chat>
    getAllChats(userId: string,role:string): Promise<Chat[]>
    


}
export default IChatRepository