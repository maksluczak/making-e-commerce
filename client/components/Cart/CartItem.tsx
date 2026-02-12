import { BackendCartItemFetch, useCart } from "@/context/CartContext";
import React from "react";

type QuantityProps = {
    quantity: number;
    setQuantity: (quantity: number) => void;
    item: BackendCartItemFetch;
};

export default function CartItem({ quantity, setQuantity, item }: QuantityProps) {
    const { updateQuantity } = useCart();

    return (
        <section className="flex items-start gap-6 py-4 group">
            <div className="w-[150px] h-[150px] bg-gray-50 overflow-hidden">
                <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${item.item.imageUrl}`}
                    alt={item.item.name}
                    className="w-full h-full"
                />
            </div>
            <div className="flex flex-col flex-grow h-[150px] justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h1 className="text-lg uppercase">{item.item.name}</h1>
                        <p className="text-lg">{item.price} PLN</p>
                    </div>
                    <p className="text-xs text-gray-400 uppercase mt-1">
                        Rozmiar: {item.size}
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex items-center border border-black h-10 overflow-hidden">
                        <button
                            onClick={() =>
                                updateQuantity(item.itemId, item.size, quantity - 1)
                            }
                            disabled={quantity <= 1}
                            className="px-4 h-full hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black transition-all"
                        >
                            <span className="text-xl">−</span>
                        </button>
                        <div className="w-12 h-full flex items-center justify-center border-x border-black font-medium text-sm">
                            {quantity}
                        </div>
                        <button
                            onClick={() =>
                                updateQuantity(item.itemId, item.size, quantity + 1)
                            }
                            className="px-4 h-full hover:bg-black hover:text-white"
                        >
                            <span className="text-xl">+</span>
                        </button>
                    </div>
                    <button
                        onClick={() => updateQuantity(item.itemId, item.size, 0)}
                        className="text-[16px] uppercase text-gray-400 hover:text-red-600 underline flex items-center"
                    >
                        Usuń
                    </button>
                </div>
            </div>
        </section>
    );
}
