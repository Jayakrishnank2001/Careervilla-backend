import { createServer } from "../config/app"
import dotenv from 'dotenv'
import connectDB from "../config/db"
dotenv.config()

connectDB()

const startServer = async () => {
    try {
        const app = createServer()
        app?.listen(3000, () => {
            console.log('Connected to Server')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()