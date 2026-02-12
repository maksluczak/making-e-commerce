"use client";

import React from "react";
import { useState } from "react";
import { ProductType } from "@/types/cart.types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProductPage({ product }: { product: ProductType }) {
    const { id, name, description, gender, category, color, price, imageUrl, variants } = product;

    const router = useRouter();
    const [size, setSize] = useState("");
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    function submitHandler() {
        console.log("submit");
        if (!isAuthenticated) {
            router.push("/logowanie");
            return;
        }
        if (!size) {
            throw new Error("Wybierz rozmiar");
            return;
        }

        addToCart(product, size);
    }

    return (
        <main className="bg-white xl:pt-[90px] flex justify-center items-start text-black">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 border-l border-t border-black">
                <section className="border-r border-black flex items-center justify-center overflow-hidden">
                    <img
                        src={`${process.env.NEXT_PUBLIC_URL}/${product.imageUrl}`}
                        alt={name}
                        className="w-full h-full"
                    />
                </section>
                <section className="flex flex-col border-r border-black">
                    <header className="border-b border-black p-8 md:p-12">
            <span className="text-xs uppercase text-gray-500 mb-2 block">
              {category}
            </span>
                        <h1 className="text-3xl md:text-4xl font-light uppercase mb-4">
                            {name}
                        </h1>
                        <p className="text-xl font-medium text-red-600 mb-10">
                            {price} PLN
                        </p>
                        <p className="text-base text-gray-400 uppercase tracking-widest leading-relaxed mb-0">
                            {product.description}
                        </p>
                    </header>
                    <section className="p-8 md:p-12 border-b border-black flex-grow">
                        <div className="flex justify-between items-center mb-6">
                            <label className="text-xs uppercase">Wybierz rozmiar</label>
                        </div>
                        <ul className="grid grid-cols-5 gap-0 border-l border-t border-black mb-10">
                            {variants.map(({ size: s, stock }) => (
                                <li key={s} className={``}>
                                    <button
                                        onClick={(e) => {
                                            if (!stock) return;
                                            console.log("size", s);
                                            setSize(s);
                                        }}
                                        className={`border-r border-b border-black h-12 w-full flex items-center justify-center cursor-pointer  transition-all text-sm font-medium ${
                                            stock ? "" : "opacity-50 cursor-not-allowed"
                                        } ${stock && "hover:bg-black hover:text-white"} ${
                                            size === s ? "bg-black text-white" : ""
                                        }`}
                                    >
                                        {s}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={submitHandler}
                            className="relative w-full border border-black py-5 uppercase tracking-[0.3em] text-sm overflow-hidden transition-all cursor-pointer hover:bg-black hover:text-white"
                        >
                            <span className="relative z-10">Dodaj do koszyka</span>
                        </button>
                    </section>
                    <section className="p-8 text-[11px] uppercase text-gray-600">
                        <p>Darmowa wysyłka powyżej 300 PLN.</p>
                        <p>Zwrot do 14 dni roboczych.</p>
                    </section>
                </section>
            </div>
        </main>
    );
}
