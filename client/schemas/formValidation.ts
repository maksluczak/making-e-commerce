import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Imię i nazwisko muszą mieć minimum 2 znaki")
  .max(50, "Imię i nazwisko mogą mieć maksymalnie 50 znaków");

export const emailValidation = z
  .email("Podaj prawidłowy adres email")
  .min(1, "Adres email jest obowiązkowy");

export const passwordValidation = z
  .string()
  .min(8, "Hasło musi mieć minimum 8 znaków")
  .max(20, "Hasło może mieć maksymalnie 20 znaków")
  .regex(/^(?=.*[A-Z]).{8,}$/, {
    message:
      "Hasło musi zawierać minimum jedną wielką literę i minimalną długość 8 znaków",
  });
