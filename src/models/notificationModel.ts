import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { NotificationData } from "../interfaces/entityInterfaces/INotification";

export interface NotificationInterface extends Document {
    _id: ObjectId,
    userId: ObjectId,
    content: NotificationData[]
}

const notificationSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    content: [
        {
            title: { type: String },
            body: { type: String },
            time: { type: Date, default: Date.now },
            status: { type: String, default: 'Unread' }
        }
    ]
})

const NotificationModel = mongoose.model<NotificationInterface>('Notification', notificationSchema)
export default NotificationModel