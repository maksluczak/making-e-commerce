"use client";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import InputBox from "./InputBox";

export default function RegistrationForm() {
    const { register, formState: { errors, isSubmitting }, onSubmit } = useSignUpForm();

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 w-full max-w-md bg-white p-8 "
        >
            <h2 className="text-2xl text-black mb-4 text-center uppercase tracking-widest">
                Zarejestruj konto
            </h2>
            <div className="flex flex-col gap-4">
                <InputBox
                    id="firstName"
                    label="Imię"
                    type="text"
                    placeholder="Jan"
                    registration={register("firstName")}
                    error={errors.firstName}
                />
                <InputBox
                    id="lastName"
                    label="Nazwisko"
                    type="text"
                    placeholder="Kowalski"
                    registration={register("lastName")}
                    error={errors.lastName}
                />
                <InputBox
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
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
                {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
            </button>
        </form>
    );
}
