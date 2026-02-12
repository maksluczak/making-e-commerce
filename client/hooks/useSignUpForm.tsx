import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export type SignUpData = z.infer<typeof signUpSchema>;

export const useSignUpForm = () => {
    const router = useRouter();
    const form = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignUpData) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Błąd podczas rejestracji");
            }

            const result = await response.json();

            form.reset();
            router.push("/logowanie");
        } catch (error: any) {
            form.setError("root", {
                message: error.message || "Serwer nie odpowiada",
            });
        }
    };

    return {
        ...form,
        onSubmit: form.handleSubmit(onSubmit),
    };
};
