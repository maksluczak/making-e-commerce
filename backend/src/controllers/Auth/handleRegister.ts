import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma";

export const handleRegister = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res
                .status(400)
                .json({ message: "First name, last name, email and password are required" });
        }

        const duplicateEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword: string = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                firstname: firstName,
                lastname: lastName,
                email: email,
                hashedPassword: hashedPassword
            }
        });

        return res.status(201).json({ message: `New User created`, body: { firstName, lastName, email } });
    } catch (err) {
        res.status(400).json({ message: "Error in signing up", body: err });
    }
}