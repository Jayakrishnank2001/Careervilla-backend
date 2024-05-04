import { IResponse } from "../common/ICommon";
import Chat from "../entityInterfaces/IChat";
import Message from "../entityInterfaces/IMessage";


export interface IMessageService{
    sendMessage(senderId: string, receiverId: string, message: string): Promise<IResponse>
    getAllMessages(senderId: string, receiverId: string): Promise<Message[]>
    getAllChats(userId: string,role:string): Promise<Chat[]>
    
}