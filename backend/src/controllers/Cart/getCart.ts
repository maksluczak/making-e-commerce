import {Request, Response} from "express";
import prisma from "../../prisma";

export const getCart = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { item: true }
                }
            }
        });

        if (!cart) {
            return res.status(401).json({ message: "Cart not found" });
        }
        return res.status(200).json({ body: cart });
    } catch (err) {
        return res.status(500).json({ message: "" });
    }
}