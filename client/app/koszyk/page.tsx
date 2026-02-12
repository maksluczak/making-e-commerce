"use client";
import React, { useState } from "react";
import CartItemQuantity from "@/components/Cart/CartItemQuantity";
import CartItem from "@/components/Cart/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
    const { items, totalPrice, isLoading } = useCart();

    return (
        <main className="min-h-screen bg-white  flex justify-center items-start text-black">
            <div className="w-full max-w-2xl px-4">
                <h2 className="text-lg uppercase mb-8 border-b border-black pb-4">
                    Twój Koszyk ({items.length} produktów)
                </h2>
                <div className="flex flex-col my-6">
                    {items.map((item, index) => (
                        <CartItem
                            item={item}
                            key={item.id}
                            quantity={item.quantity}
                            setQuantity={() => {}}
                        />
                    ))}
                </div>
                <section className="p-8 border-t border-black">
                    <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-light">
              Suma: {totalPrice.toFixed(2)} PLN
            </span>
                    </div>
                    <Link
                        href="/podsumowanie"
                        className="block text-center  w-full bg-black text-white py-5 uppercase cursor-pointer"
                    >
                        Przejdź do płatności
                    </Link>
                </section>
            </div>
        </main>
    );
}
