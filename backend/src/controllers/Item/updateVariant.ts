import {Request, Response} from "express";
import prisma from "../../prisma";

type VariantRequest = {
    size: string;
    stock: number;
}

export const updateVariant = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.id);
        const { size, stock } = req.body as VariantRequest;
        if (!size) {
            return res.status(400).json({ message: "Size is required" });
        }

        await prisma.variant.update({
            where: { itemId_size: {itemId, size} },
            data: { stock: stock}
        });

        const item = await prisma.item.findUnique({
            where: { id: itemId},
            include: { variants: true }
        })

        return res.status(200).json({ message: "Variant updated successfully", body: item });
    } catch (err) {
        return res.status(500).json({ message: "Item update failed" });
    }
}