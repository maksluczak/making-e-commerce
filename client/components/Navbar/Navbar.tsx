"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import LowerProductBar from "@/components/Navbar/LowerProductBar";
import SearchBar from "@/components/Navbar/SearchBar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const { itemsCount } = useCart();
    return (
        <header className="fixed w-full z-20 top-0 start-0 bg-white border-b border-default">
            <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
                <div className="flex-1 flex justify-start">
                    {/* <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-heading"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button> */}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/">
                        <Image
                            src="/making-logo-2.png"
                            width={80}
                            height={60}
                            alt="logo"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex-1 flex justify-end items-center gap-2">
                    {/* <SearchBar /> */}
                    {!isAuthenticated && (
                        <Link
                            href="/logowanie"
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-heading"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </Link>
                    )}
                    <Link
                        href="/koszyk"
                        className="p-2 hover:bg-gray-100 rounded-full relative"
                    >
                        {itemsCount > 0 && isAuthenticated && (
                            <span className="absolute -top-1 -end-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
                        )}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    </Link>
                    {isAuthenticated && (
                        <>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-heading"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <LowerProductBar />
        </header>
    );
}
