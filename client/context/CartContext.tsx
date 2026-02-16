"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { ProductType } from "@/types/cart.types";
import { apiClient } from "@/services/api-client";
import { getCookie } from "cookies-next";

interface BackendCartProductFetch extends Omit<ProductType, "variants"> {
    popularity: number;
}

export interface BackendCartItemFetch {
    cartId: number;
    id: number;
    item: BackendCartProductFetch;
    itemId: number;
    price: number;
    quantity: number;
    size: string;
}

interface CartResponse {
    body: {
        items: BackendCartItemFetch[];
    };
}

interface CartContextType {
    items: BackendCartItemFetch[];
    addToCart: (product: ProductType, size: string) => Promise<void>;
    updateQuantity: (itemId: number, size: string, quantity: number) => Promise<void>;
    totalPrice: number;
    itemsCount: number;
    isLoading: boolean;
    fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<BackendCartItemFetch[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        const token = getCookie("access_token");
        if (!token) return;

        setIsLoading(true);
        try {
            const result = await apiClient.get<CartResponse>("/cart");
            setItems(result?.body?.items || []);
        } catch (err) {
            console.error("Błąd pobierania koszyka:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addToCart = async (product: ProductType, size: string) => {
        try {
            await apiClient.post("/cart", {
                itemId: product.id,
                size: size,
                quantity: 1,
            });
            await fetchCart();
        } catch (err) {
            console.error("Błąd przy dodawaniu do koszyka:", err);
        }
    };

    const updateQuantity = async (itemId: number, size: string, quantity: number) => {
        const finalQuantity = Math.max(0, quantity);
        try {
            await apiClient.patch("/cart", {
                itemId,
                size,
                quantity: finalQuantity,
            });
            await fetchCart();
        } catch (err) {
            console.error("Błąd aktualizacji koszyka:", err);
        }
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <CartContext.Provider value={{ items, addToCart, updateQuantity, totalPrice, itemsCount, isLoading, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};