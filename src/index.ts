import { createServer } from "../config/app"
import dotenv from 'dotenv'
import connectDB from "../config/db"
import { Server, Socket } from 'socket.io';
import http from 'http';
import Message from "./interfaces/entityInterfaces/IMessage";
import MessageService from "./services/messageService";
import MessageRepository from "./repositories/messageRepository";
import ChatRepository from "./repositories/chatRepository";
import NotificationRepository from "./repositories/notificationRepository";
import NotificationService from "./services/notificationService";
import JobRepository from "./repositories/jobRepository";
import JobseekerRepository from "./repositories/jobseekerRepository";
import EmployerRepository from "./repositories/employerRepository";
const messageRepository = new MessageRepository()
const chatRepository = new ChatRepository()
const jobseekerRepository = new JobseekerRepository()
const employerRepository = new EmployerRepository()
const messageService = new MessageService(messageRepository, chatRepository, jobseekerRepository, employerRepository)
const notificationRepository = new NotificationRepository()
const jobRepository = new JobRepository()
const notificationService = new NotificationService(notificationRepository, jobRepository)

dotenv.config()

connectDB()

const startServer = async () => {
    try {
        const app = createServer()
        const server = http.createServer(app)
        const port = 3000
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

            socket.on('send-notification', async (jobId: string) => {
                const notificationData = await notificationService.generateNotification(jobId)
                socket.to(userSockets.get(notificationData.employerId as unknown as string) as string).emit('receive-notification', notificationData)
            })

            socket.on('disconnect', () => {
                userSockets.delete(id)
            });
        });
        server?.listen(port, () => {
            console.log('Connected to Server')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()
