import React from "react";

export default function SearchBar() {
    return (
        <>
            <div className="relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M16.65 11a5.65 5.65 0 1 1-11.3 0 5.65 5.65 0 0 1 11.3 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    placeholder="Szukaj"
                    className="w-48 lg:w-64 p-2 ps-9 text-sm bg-gray-50 border outline-none mr-6"
                />
            </div>
        </>
    )
}