import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbURI: string =  process.env.db_URI || ""

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)
            .then((data: any) => console.log(`Connected to MongoDB`))
    } catch (error: any) {
        console.log(error.message)
    }
}

export default connectDB