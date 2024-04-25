import Chat from "../entityInterfaces/IChat"


interface IChatRepository{
    findOrCreateChat(senderId: string, receiverId: string): Promise<Chat>
    


}
export default IChatRepository