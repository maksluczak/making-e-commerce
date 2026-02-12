"use client";
import { useSignInForm } from "@/hooks/useSignInForm";
import InputBox from "./InputBox";
import Link from "next/link";

export default function LoginForm() {
    const { register, formState: { errors, isSubmitting }, onSubmit } = useSignInForm();

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 w-full max-w-md bg-white p-8 "
        >
            <h2 className="text-2xl text-black mb-4 text-center uppercase tracking-widest">
                Zaloguj się
            </h2>
            <div className="flex flex-col gap-4">
                <InputBox
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="twoj@email.com"
                    registration={register("email")}
                    error={errors.email}
                />
                <InputBox
                    id="password"
                    label="Hasło"
                    type="password"
                    placeholder="********"
                    registration={register("password")}
                    error={errors.password}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-black py-5 uppercase cursor-pointer disabled:bg-gray-500"
            >
                {isSubmitting ? "Logowanie..." : "Zaloguj się"}
            </button>
            <p className="text-black text-sm text-center">
                Nie masz konta?
                <Link href="/rejestracja">
          <span className="text-black cursor-pointer underline">
            Zarejestruj się
          </span>
                </Link>
            </p>
        </form>
    );
}
