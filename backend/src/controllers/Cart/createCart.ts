import { Request, Response } from "express";
import prisma from "../../prisma";

export const createCart = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || !quantity) {
      return res
        .status(400)
        .json({ message: "Item id, size and quantity are required" });
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { variants: true },
    });
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const variant = await prisma.variant.findUnique({
      where: { itemId_size: { itemId, size } },
    });
    if (!variant) {
      return res.status(400).json({ message: "Variant does not exist" });
    }
    if (variant.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    const price: number = item.price;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (cart) {
      const itemInCart = cart.items.find(
        (cartItem) => cartItem.itemId === itemId && cartItem.size === size,
      );
      if (itemInCart) {
        await prisma.cartItem.update({
          where: {
            id: itemInCart.id,
          },
          data: {
            quantity: itemInCart.quantity + quantity,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            itemId,
            size,
            price,
            quantity,
          },
        });
      }
      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cart.id },
      });
      const newBill = cartItems.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      const updatedCart = await prisma.cart.update({
        where: { id: cart.id },
        data: { bill: newBill },
        include: { items: true },
      });
      return res.status(200).json({ message: "Cart updated", updatedCart });
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userId,
          bill: quantity * price,
          items: {
            create: {
              itemId,
              size,
              price,
              quantity,
            },
          },
        },
        include: { items: true },
      });
      return res.status(201).json({ message: "Cart created", cart: newCart });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error creating Cart", error: err });
  }
};
