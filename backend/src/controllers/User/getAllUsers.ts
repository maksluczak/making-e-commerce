import {Request, Response} from "express";
import prisma from "../../prisma";

export const getAllUsers = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const users = await prisma.user.findMany({ });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching Users", error: err });
    }
}