import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export type SignInData = z.infer<typeof signInSchema>;

export const useSignInForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInData) => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Błąd logowania");
            }

            const result = await response.json();
            console.log("Zalogowano pomyślnie!", result);
            login(result.body.accessToken);

            form.reset();
            router.push("/");
            router.refresh();
        } catch (error: any) {
            form.setError("root", { message: error.message });
            alert(error.message || "Wystąpił błąd podczas logowania");
        }
    };

    return {
        ...form,
        onSubmit: form.handleSubmit(onSubmit),
    };
};
