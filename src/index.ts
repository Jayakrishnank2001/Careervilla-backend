import { createServer } from "../config/app"
import dotenv from 'dotenv'
import connectDB from "../config/db"
import { Server, Socket } from 'socket.io';
import http from 'http';
import Message from "./interfaces/entityInterfaces/IMessage";
import MessageService from "./services/messageService";
import MessageRepository from "./repositories/messageRepository";
import ChatRepository from "./repositories/chatRepository";
import Notification from "./interfaces/entityInterfaces/INotification";
const messageRepository = new MessageRepository()
const chatRepository = new ChatRepository()
const messageService = new MessageService(messageRepository, chatRepository)

dotenv.config()

connectDB()

const startServer = async () => {
    try {
        const app = createServer()
        const server = http.createServer(app)
        const io = new Server(server, {
            cors: {
                origin: process.env.CORS_URL,
                methods: ['GET', 'POST'],
            },
        });
        const userSockets = new Map<string, string>()

        io.on('connection', (socket: Socket) => {
            const id = socket.handshake.query.id as string
            userSockets.set(id, socket.id)

            socket.on('send-message', async (chatData: Message) => {
                let receiverId = chatData.receiverId
                const messageData = await messageService.sendMessage(chatData.senderId as unknown as string, chatData.receiverId as unknown as string, chatData.message)
                socket.to(userSockets.get(receiverId as unknown as string) as string).emit('receive-message', messageData)
            });
            
            socket.on('notification', async (notificationData: Notification) => {
                
            })
            
            socket.on('disconnect', () => {
                userSockets.delete(id)
            });
        });
        app?.listen(3000, () => {
            console.log('Connected to Server')
        })
        io.listen(3001)
        return io
    } catch (error) {
        console.log(error)
    }
}

startServer()
