import {Request, Response} from 'express';
import prisma from "../../prisma";

type VariantRequest = {
    size: string;
    stock: string;
}

type ItemRequest = {
    name: string;
    description: string;
    gender: string;
    category: string;
    color: string;
    price: string;
    variants: VariantRequest[];
}

export const createItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { name, description, gender, category, color, price, variants } = req.body as ItemRequest;
        if (!name || !description || !gender || !category || !color || !price) {
            return res.status(400).json({ message: "All item data are required" });
        }

        const image_url: string = req.file ? `uploads/${req.file.filename}` : "";
        const priceNumber = parseFloat(price);
        const parsedVariants = variants.map((variant) =>{
            return { size: variant.size, stock: parseInt(variant.stock) };
        })

        const item = await prisma.item.create({
            data: {
                name,
                description,
                gender,
                category,
                color,
                price: priceNumber,
                imageUrl: image_url,
                popularity: 0,
                variants: {
                    create: parsedVariants.map((variant) => ({
                        size: variant.size,
                        stock: variant.stock,
                    }))
                }
            },
            include: { variants: true }
        });

        return res.status(201).json({ message: "Item created successfully.", body: item });
    } catch (err) {
        return res.status(400).json({ message: "Error creating Item", error: err });
    }
}