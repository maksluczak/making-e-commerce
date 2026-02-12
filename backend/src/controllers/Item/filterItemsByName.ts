import {Request, Response} from 'express';
import prisma from "../../prisma";

export const filterItemsByName = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { name } = req.query;
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Missing name" });
        }

        const validatedName = name.trim().toLowerCase();

        const items = await prisma.item.findMany({
            where: {
                name: {
                    startsWith: validatedName,
                    mode: "insensitive"
                }
            },
            include: { variants: true }
        });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({message: "Error filtering items", error: err});
    }
}