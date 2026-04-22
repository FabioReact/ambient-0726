import z from "zod";

export const schema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, { error: "Le mot de passe doit faire au moins 6 charactères" })
      .max(100),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: "Le mot de passe et sa confirmation doivent être identiques",
    path: ["passwordConfirmation"],
  })
  .required();
