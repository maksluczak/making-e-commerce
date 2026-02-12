import {Request, Response} from "express";
import prisma from "../../prisma";

export const updateCart = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const { itemId, size, quantity } = req.body;

        if (itemId == null || !size || quantity == null) {
            return res.status(400).json({ message: "Quantity, item id and size are required" });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart does not exist" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, itemId, size }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        const updatedCart = await prisma.$transaction(async (tx) => {
            if (quantity <= 0) {
                await tx.cartItem.delete({
                    where: { id: cartItem.id }
                });
            } else {
                await tx.cartItem.update({
                    where: { id: cartItem.id },
                    data: { quantity }
                });
            }

            const cartItems = await tx.cartItem.findMany({
                where: { cartId: cart.id }
            });

            const newBill = cartItems.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0);

            return tx.cart.update({
                where: { id: cart.id },
                data: { bill: newBill },
                include: { items: true }
            });
        });

        return res.status(200).json({ message: "Cart updated", updatedCart });
    } catch (err) {
        return res.status(500).json({ message: "Failed to update Cart" });
    }
}