import { createServer } from "../config/app"
import dotenv from 'dotenv'
import connectDB from "../config/db"
import { Server } from 'socket.io';
import http from 'http';
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

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('send-message', (data) => {
                console.log('Received message:', data);
                io.emit('receive-message', data);
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected:', socket.id);
            });
        });
        app?.listen(3000, () => {
            console.log('Connected to Server')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()