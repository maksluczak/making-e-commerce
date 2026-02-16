"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function LowerProductBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");

    const categoryHandler = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentCategory === value.toLowerCase()) {
            params.delete("category");
        } else {
            params.set("category", value.toLowerCase());
        }

        router.push(`/?${params.toString()}`);
    };
    return (
        <>
            <nav className="border-t border-default bg-white">
                <div className="max-w-screen-xl mx-auto p-3">
                    <ul className="flex flex-row justify-center gap-8 font-medium text-sm">
                        {["Koszulki", "Bluzy", "Spodnie", "Skarpetki"].map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => categoryHandler(item)}
                                    className="text-heading hover:text-black transition-all hover:underline underline-offset-8"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}
