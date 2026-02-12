"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { ProductType } from "@/types/cart.types";
import { getCookie } from "cookies-next";
import { number } from "zod";

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

interface CartContextType {
    items: BackendCartItemFetch[];
    addToCart: (product: ProductType, size: string) => Promise<void>;
    updateQuantity: (
        itemId: number,
        size: string,
        quantity: number,
    ) => Promise<void>;
    totalPrice: number;
    itemsCount: number;
    isLoading: boolean;
    fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<BackendCartItemFetch[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        const token = getCookie("access_token");
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/cart`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: "include",
                },
            );

            if (response.ok) {
                const result = await response.json();
                setItems(result.body.items || []);
            }
        } catch (err) {
            console.error("Błąd pobierania koszyka:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async (product: ProductType, size: string) => {
        try {
            const token = getCookie("access_token");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        itemId: product.id,
                        size: size,
                        quantity: 1,
                    }),
                },
            );

            if (response.ok) {
                await fetchCart();
            }
        } catch (err) {
            console.error("Błąd sieciowy przy dodawaniu:", err);
        }
    };

    const updateQuantity = async ( itemId: number, size: string, quantity: number ) => {
        const token = getCookie("access_token");
        if (!token) return;

        const finalQuantity = quantity < 0 ? 0 : quantity;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/cart`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        itemId: itemId,
                        size: size,
                        quantity: finalQuantity,
                    }),
                },
            );

            if (response.ok) {
                await fetchCart();
            } else {
                console.error("Błąd aktualizacji koszyka");
            }
        } catch (err) {
            console.error("Błąd sieciowy przy updateQuantity:", err);
        }
    };

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetchCart();
    }, []);

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
