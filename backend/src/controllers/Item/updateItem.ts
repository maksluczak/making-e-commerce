import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import prisma from "../../prisma";

export const updateItem = async (req: Request, res: Response): Promise<Response | void> => {
    const updates: string[] = Object.keys(req.body);
    const allowedUpdates: string[] = ["name", "description", "gender", "category", "color", "price", "popularity"];

    const isValidUpdate: boolean = updates.every((update: string) => allowedUpdates.includes(update));
    if (!isValidUpdate) return res.status(400).json({ message: "Invalid updates" });

    try {
        const itemId: number = parseInt(req.params.id);
        const { ...itemUpdates } = req.body;

        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        let imageUrl = item.imageUrl;
        if (req.file) {
            if (item.imageUrl) {
                const previousPath: string = path.join(__dirname, "..", "..", "..", item.imageUrl);
                if (fs.existsSync(previousPath)) {
                    fs.unlinkSync(previousPath);
                }
            }
            imageUrl = `uploads/${req.file.filename}`;
        }

        const updatedItem = await prisma.item.update({
            where: { id: itemId},
            data: {
                name: itemUpdates.name,
                description: itemUpdates.description,
                gender: itemUpdates.gender,
                category: itemUpdates.category,
                color: itemUpdates.color,
                price: itemUpdates.price,
                imageUrl: imageUrl,
                popularity: itemUpdates.popularity
            }, include: { variants: true }
        })

        return res.status(200).json({ message: "Item updated", updatedItem });
    } catch (err) {
        return res.status(500).json({ message: "Item update failed" });
    }
};