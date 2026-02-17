import React from "react";
import Link from "next/link";
import { ProductType } from "@/types/cart.types";
import { apiClient } from "@/services/api-client";

export default function ProductCard({ product }: { product: ProductType }) {
    return (
        <div className="max-w-2xs bg-white border border-black flex flex-col">
            <div className="w-full h-80 flex items-center justify-center overflow-hidden border-b border-black">
                <img
                    className="max-w-full max-h-full object-contain"
                    src={apiClient.getImageUrl(product.imageUrl)}
                    alt={product.name}
                />
            </div>
            <div className="p-3">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h2 className="text-sm font-light uppercase">{product.name}</h2>
                    <span className="text-sm font-medium block min-w-max">
            {product.price.toFixed(2)} PLN
          </span>
                </div>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed mb-0">
                    {product.description}
                </p>
            </div>
            <div className="mt-6 text-base flex gap-4 items-center justify-center border-t border-black">
                <Link
                    href={`/${product.id}`}
                    className="flex justify-center items-center w-full h-full hover:underline  px-5 py-2"
                >
                    Zobacz
                </Link>
            </div>
        </div>
    );
}
