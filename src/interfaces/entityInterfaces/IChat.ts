import { ObjectId } from "mongoose"

interface Chat{
    id: string
    participants?: ObjectId[]
    createdAt?:string
}

export default Chat