import {Request, Response} from "express";
import prisma from "../../prisma";

export const getItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const itemId: number = parseInt(req.params.id);
        if (!itemId) {
            return res.status(400).json({ message: "Id is required" });
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId },
            include: { variants: true }
        });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: "Error fetching Item", error: err });
    }
}