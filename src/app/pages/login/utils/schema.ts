import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email não é um email valido" })
    .min(1, { message: "Email é obrigatório" }),
  password: z
    .string()
    .min(3, { message: "Senha deve ter pelo menos 3 caracteres" }),
});
