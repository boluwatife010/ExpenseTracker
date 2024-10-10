import express, {Request, Response, NextFunction} from 'express'
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = async (id: string): Promise<string> => {
    const token = jwt.sign({id}, process.env.JWT_SECRET as Secret, {expiresIn : '30d'})
    return token
}
export const verifyToken = async (token: string): Promise<any> => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as Secret)
        return decode
    }   catch {
        throw new Error('Invalid token provided.')
    }
}
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(400).send({message: 'Authentication is required'})
    }
    try {
        const tokenString = Array.isArray(token) ? token[0] : token;
        const decoded = await verifyToken(tokenString.replace('Bearer', '').trim());
        (req as any).user = decoded;
        next();

    }   catch(err) {
        res.status(401).send({mesage: 'Invalid token inputted.'})
    }
}
export default authenticateToken