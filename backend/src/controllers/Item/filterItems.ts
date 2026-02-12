import {Request, Response} from 'express';
import prisma from "../../prisma";
import {Prisma} from "@prisma/client";

export const filterItems = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const allowedFilters = ["gender", "category", "color"];
        const where: Prisma.ItemWhereInput = {};

        allowedFilters.forEach(filter => {
            const singleQuery = req.query[filter];
            if (typeof singleQuery === "string") {
                (where as any)[filter] = singleQuery; // rzutowanie na any, bo miałem tu błąd i nie wiedziałem co zrobić
            }
        });

        const {minPrice, maxPrice} = req.query;
        if (minPrice || maxPrice) {
            if (typeof minPrice === "string") {
                where.price = {
                    gt: parseInt(minPrice)
                }
            }
            if (typeof maxPrice === "string") {
                where.price = {
                    lt: parseInt(maxPrice)
                }
            }
        }

        const items = await prisma.item.findMany({
            where: where,
            include: { variants: true }
        });

        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({message: "Error filtering items", error: err});
    }
}