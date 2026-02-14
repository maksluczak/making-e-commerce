import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? "";

export const handleLogin = async ( req: Request, res: Response ): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        const foundUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!foundUser) {
            return res.status(401).json({ message: "User does not exist." });
        }

        const isPasswordMatched: boolean = await bcrypt.compare(
            password,
            foundUser.hashedPassword,
        );
        if (isPasswordMatched) {
            const accessToken: string = jwt.sign(
                { id: foundUser.id, email: foundUser.email },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" },
            );
            const refreshToken: string = jwt.sign(
                { id: foundUser.id, email: foundUser.email },
                REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" },
            );

            await prisma.user.update({
                where: { email },
                data: {
                    refreshToken: refreshToken,
                },
            });

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                message: "User is signed in successfully",
                body: { accessToken },
            });
        } else {
            res.status(401).json({ message: "Passwords do not match" });
        }
    } catch (err) {
        res.status(400).json({ message: "Error in signing in", body: err });
    }
}
