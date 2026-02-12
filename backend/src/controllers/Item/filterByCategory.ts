import {Request, Response} from "express";
import prisma from "../../prisma";

export const filterItemsByCategory = async (req: Request, res: Response): Promise<Response | void> => {
    const allowedCategories = ["koszulki", "bluzy", "spodnie", "skarpetki"];
    try {
        const { category } = req.query;

        if (typeof category === "string" && allowedCategories.some((filter) => { return filter === category; })) {
            const items = await prisma.item.findMany({
                where: { category: category },
                include: { variants: true }
            });
            return res.status(200).json(items);
        } else {
            return res.status(404).json({ message: "Not Found, error filtering by category" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error finding items", error: err });
    }
}