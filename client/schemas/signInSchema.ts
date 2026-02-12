import {z} from "zod";
import {emailValidation, passwordValidation} from "@/schemas/formValidation";

export const signInSchema = z.object({
    email: emailValidation,
    password: passwordValidation
});