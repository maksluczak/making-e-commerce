import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/hooks/client";
import { LoginResponse } from "@/types/auth.types";

export type SignInData = z.infer<typeof signInSchema>;

export const useSignInForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: SignInData) => {
        try {
            const result = await apiClient.post<LoginResponse>(
                "/auth/login",
                data
            );

            login(result.body.accessToken);

            form.reset();
            router.push("/");
            router.refresh();
        } catch (error: any) {
            form.setError("root", { message: error.message });
            alert(error.message || "Wystąpił błąd podczas logowania");
        }
    }

    return {
        ...form,
        onSubmit: form.handleSubmit(onSubmit),
    }
}
