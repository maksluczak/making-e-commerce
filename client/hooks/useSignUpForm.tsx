import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { apiClient } from "@/hooks/client"

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
            await apiClient.post<void>("/auth/register", data);

            form.reset();
            router.push("/logowanie");
        } catch (error: any) {
            form.setError("root", {
                message: error.message || "Serwer nie odpowiada",
            });
        }
    }

    return {
        ...form,
        onSubmit: form.handleSubmit(onSubmit),
    }
}
