import {z} from "zod";
import {emailValidation, passwordValidation, usernameValidation} from "@/schemas/formValidation";

export const signUpSchema = z.object({
    firstName: usernameValidation,
    lastName: usernameValidation,
    email: emailValidation,
    password: passwordValidation
});