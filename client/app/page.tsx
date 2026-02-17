import ProductCard from "@/components/Shopping/ProductCard";
import { ProductType } from "@/types/cart.types";
import { apiClient } from "@/services/api-client";
import React from "react";

const fetchProducts = async (cat?: string) => {
    const endpoint = cat
        ? `/item/filter/category?category=${encodeURIComponent(cat)}`
        : "/item";

    try {
        return await apiClient.get<ProductType[]>(endpoint);
    } catch (error) {
        console.error("Błąd podczas ładowania produktów:", error);
        return [];
    }
};

export default async function Home({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams.category;

    const items = await fetchProducts(category as string | undefined);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-start gap-12 pt-[50px]">
            {items && items.length > 0 ? (
                    items.map((item: ProductType) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center py-32">
                        <h1 className="text-6xl font-light tracking-widest text-gray-900">
                            BRAK PRODUKTÓW
                        </h1>
                        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500">
                            Nie znaleziono produktów spełniających wybrane kryteria
                        </p>
                    </div>
            )}
            </div>
        </>
    );
}