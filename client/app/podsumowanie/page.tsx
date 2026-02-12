"use client";
import React, { use, useState } from "react";
import Card from "@/components/Auth/Card";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { refresh } from "next/cache";
import { useCart } from "@/context/CartContext";

export default function Page() {
    const router = useRouter();
    const { fetchCart } = useCart();
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return alert("Podaj adres!");

        const token = getCookie("access_token");
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify({ address: address }),
                },
            );

            if (response.ok) {
                const result = await response.json();

                setOrderId(result.order.id);
            } else {
                console.error("Błąd przy tworzeniu zamówienia");
            }
        } catch (err) {
            console.error("Błąd sieciowy:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmOrderHandler = async () => {
        if (!orderId) return;

        const token = getCookie("access_token");
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/order/${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                },
            );

            if (response.ok) {
                const result = await response.json();
                router.push("/");
                alert("Zamówienie zostało złożone pomyślnie!");
                await fetchCart();
                router.refresh();
            } else {
                console.error("Błąd przy zatwierdzaniu zamówienia");
            }
        } catch (err) {
            console.error("Błąd sieciowy:", err);
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
