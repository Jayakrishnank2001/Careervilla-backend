import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is missing in the environment variables.');
    process.exit(1);
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null
    }
};

export class createJWT {
    generateToken = (payload: any): string => {
        const jwtSecret = process.env.JWT_SECRET
        return jwt.sign(payload, jwtSecret as Secret, { expiresIn: '5h' });
    };
}