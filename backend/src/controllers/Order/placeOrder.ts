import { Request, Response } from "express";
import prisma from "../../prisma";

export const placeOrder = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const { address } = req.body;
        if (!address) {
            return res.status(400).send({ message: "Address is required" });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { item: true } } }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await prisma.order.create({
            data: {
                userId,
                amount: cart.bill,
                address: address,
                status: "Order placed",
                paymentType: "COD",
                isPaid: false,
                items: {
                    create: cart.items.map((item) => ({
                        size: item.size,
                        price: item.price,
                        quantity: item.quantity,
                        itemId: item.itemId
                    }))
                }
            },
            include: { items: true }
        });

        return res.status(201).json({ message: "Successfully placed order", order });
    } catch (err) {
        return res.status(400).json({ message: "Error creating Order", error: err });
    }
}