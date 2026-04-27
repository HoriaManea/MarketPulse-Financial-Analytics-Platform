import z from "zod";

export const newUserSchema = z
  .object({
    email: z.string().email("The Email is not valid"),
    password: z.string().min(12, "Password must contain at least 12 caracters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolele nu coincid",
    path: ["confirmPassword"],
  });
