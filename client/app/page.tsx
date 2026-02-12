import ProductCard from "@/components/Shopping/ProductCard";
import {ProductType} from "@/types/cart.types";
import React from "react";

const fetchProducts = async (cat?: string | undefined) => {
    const url = new URL("/api/v1/item", process.env.NEXT_PUBLIC_URL);

    if (cat) {
        url.pathname += "/filter/category";
        url.searchParams.set("category", cat);
    }

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    return await response.json();
};

export default async function Home({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { category } = searchParams;

    const items = await fetchProducts(category as string | undefined);

    return (
        <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-12 min-h-screen pt-[20px] xl:pt-0">
                {items.map((item: ProductType) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </main>
    );
}
