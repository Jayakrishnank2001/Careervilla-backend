import { ObjectId } from "mongoose"

interface Notification{
    id?: string
    userId?:ObjectId
    content?:NotificationData[]
}
export default Notification

export interface NotificationData{
    title: string,
    body: string,
    time?: string,
    status?:string
}