import { Request, Response } from "express";
import MessageService from "../services/messageService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class MessageController {

    constructor(private messageService: MessageService) { }

    async getAllMessages(req: Request, res: Response) {
        try {
            const messages = await this.messageService.getAllMessages(req.query.senderId as string, req.query.receiverId as string)
            res.status(STATUS_CODES.OK).json(messages)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async getAllChats(req: Request, res: Response) {
        try {
            const chats = await this.messageService.getAllChats(req.query.userId as string,req.query.role as string)
            res.status(STATUS_CODES.OK).json(chats)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async getReceiverDetails(req: Request, res: Response) {
        try {
            const receiverDetails = await this.messageService.getReceiverDetails(req.query.userId as string, req.query.role as string)
            res.status(STATUS_CODES.OK).json(receiverDetails)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

}
export default MessageController