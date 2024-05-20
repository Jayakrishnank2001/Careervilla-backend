import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbURI: string = process.env.DB_URI || ""

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)
            .then(() => console.log(`Connected to MongoDB`))
    } catch (error) {
        console.log(error)
    }
}

export default connectDB