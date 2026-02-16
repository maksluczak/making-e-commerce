"use client";
import React, { useState } from "react";
import Card from "@/components/Auth/Card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { apiClient } from "@/services/api-client";
import { OrderType } from "@/types/order.types";

export default function Page() {
    const router = useRouter();
    const { fetchCart } = useCart();
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return alert("Podaj adres!");

        setIsLoading(true);

        try {
            const response = await apiClient.post<OrderType>("/order", {
                address: address
            });

            if (response?.order) {
                setOrderId(response.order.id);
            }
        } catch (err) {
            console.error("Błąd przy tworzeniu zamówienia:", err);
            alert("Nie udało się złożyć zamówienia. Sprawdź czy koszyk nie jest pusty.");
        } finally {
            setIsLoading(false);
        }
    };

    const confirmOrderHandler = async () => {
        if (!orderId) return;

        setIsLoading(true);

        try {
            await apiClient.patch(`/order/${orderId}`);
            alert("Zamówienie zostało złożone pomyślnie!");

            await fetchCart();
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error("Błąd przy zatwierdzaniu zamówienia:", err);
            alert("Wystąpił błąd podczas potwierdzania zamówienia.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(orderId);
    }, [orderId]);

    return (
        <section className="flex items-center pb-10">
            <Card>
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col relative overflow-hidden mb-4"
                >
                    <label htmlFor="adres" className="text-black uppercase text-sm mb-1">
                        Podaj adres dostawy:
                    </label>
                    <input
                        id="adres"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Wpisz adres dostawy"
                        className="block py-1 px-3 bg-transparent border border-black text-black text-base placeholder-gray-400 focus-within:outline-none"
                        required
                    />

                    {!orderId && (
                        <button
                            type="submit"
                            disabled={isLoading || !address}
                            className="mt-10 bg-black py-5 text-white uppercase cursor-pointer disabled:bg-gray-500 transition-colors"
                        >
                            {isLoading ? "Przetwarzanie..." : "Złóż zamówienie"}
                        </button>
                    )}
                </form>

                {orderId && (
                    <>
                        <div className="mt-4 p-4 bg-green-100 text-green-800 text-sm">
                            Utworzono zamówienie nr: {orderId}. Kliknij zatwierdź, aby
                            sfinalizować.
                        </div>
                        <button
                            onClick={confirmOrderHandler}
                            className="block w-full mt-10 bg-black py-5 text-white uppercase cursor-pointer disabled:bg-gray-500 transition-colors"
                        >
                            {isLoading ? "Przetwarzanie..." : "Zatwierdź"}
                        </button>
                    </>
                )}
            </Card>
        </section>
    );
}
