import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import prisma from "../../prisma";

export const deleteItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const itemId: number = parseInt(req.params.id);
        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.imageUrl) {
            const filePath: string = path.join(__dirname, "..", "..", "..", item.imageUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.item.delete({
            where: { id: itemId }
        });

        return res.status(200).json({ message: "Item deleted" });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while deleting Item" });
    }
}