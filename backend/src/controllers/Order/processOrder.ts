import { Request, Response } from "express";
import prisma from "../../prisma";

export const processOrder = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const orderId = parseInt(req.params.id);

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true }
        });

        if (!cart) {
            return res.status(401).json({ message: "Cart not found" });
        }

        await prisma.$transaction(async (tx) => {
            await tx.order.update({
                where: { id: orderId, userId },
                data: {
                    isPaid: true
                }
            })

            for (const item of cart.items) {
                await tx.variant.update({
                    where: {
                        itemId_size: { itemId: item.itemId, size: item.size }
                    },
                    data: {
                        stock: { decrement: item.quantity }
                    }
                });
            }

            await tx.cartItem.deleteMany({
                where: { cartId: cart.id }
            });

            await tx.cart.update({
                where: { id: cart.id },
                data: { bill: 0 }
            });
        });

        return res.status(201).json({ message: "Successfully processed successfully" });
    } catch (err) {
        return res.status(400).json({ message: "Error processing Order", error: err });
    }
}