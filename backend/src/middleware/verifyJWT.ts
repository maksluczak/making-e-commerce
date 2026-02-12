import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {MyJwtPayload} from "../types/jwt";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? "";

export const verifyJWT = async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const authHeader: any = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authorization header missing." });
        }
        
        const token: any = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as MyJwtPayload;
        req.user = {
            id: decoded.id
        };

        next();
    } catch (err) {
        return res.status(400).json({ message: "Authorization required" });
    }
}