import { Request, Response } from "express";
import MessageService from "../services/messageService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class MessageController {

    constructor(private messageService: MessageService) { }

    async sendMessage(req: Request, res: Response) {
        try {
            const { senderId, receiverId, message } = req.body
            const sendMessage = await this.messageService.sendMessage(senderId, receiverId, message)
            res.status(sendMessage.status).json(sendMessage)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async getAllMessages(req: Request, res: Response) {
        try {
            const messages = await this.messageService.getAllMessages(req.query.senderId as string, req.query.receiverId as string)
            res.status(STATUS_CODES.OK).json(messages)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

}
export default MessageController