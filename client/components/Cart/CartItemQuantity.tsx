"use client"
import React from "react";
import {CartItemQuantityProps} from "@/types/cart.types";

export default function CartItemQuantity({ quantity, setQuantity }: CartItemQuantityProps) {
    return (
        <div className="flex items-center border border-black h-10 overflow-hidden">
            <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="px-4 h-full hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black transition-all"
            >
                <span className="text-xl">−</span>
            </button>
            <div className="w-12 h-full flex items-center justify-center border-x border-black font-medium text-sm">
                {quantity}
            </div>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 h-full hover:bg-black hover:text-white"
            >
                <span className="text-xl">+</span>
            </button>
        </div>
    );
}