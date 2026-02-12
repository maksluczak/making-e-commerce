import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma";
import {MyJwtPayload} from "../../types/jwt";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? "";

export const refreshToken = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies?.jwt;

        const decoded: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as MyJwtPayload;

        const foundUser = await prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!foundUser) {
            return res.status(403).json({message: "User not found"});
        }

        if (foundUser.id === decoded.id) {
            const accessToken: string = jwt.sign({ id: foundUser.id, email: foundUser.email }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            return res.status(200).json({ accessToken });
        } else {
            return res.status(403).json({message: "User not found"});
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }
}