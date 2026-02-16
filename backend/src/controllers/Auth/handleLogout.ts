import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma";
import {MyJwtPayload} from "../../types/jwt";

const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? "";

export const handleLogout = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const cookies: any = req.cookies;
        const refreshToken: any = cookies.jwt;

        if (!refreshToken) {
            return res.sendStatus(204);
        }

        const decoded: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as MyJwtPayload;

        const foundUser = await prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!foundUser) {
            return res.status(403).json({message: "User not found"});
        }

        await prisma.user.update({
            where: { id: foundUser.id },
            data: {
                refreshToken: ""
            }
        });

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        return res.sendStatus(204);
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err });
    }
}