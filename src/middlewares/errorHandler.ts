import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCodes";

export class ErrorHandler {
    static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(err.stack)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
}