import * as z from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Enter valid Email." }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password should be contain 8 characters" }),
    conformationPassword: z
      .string()
      .min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.conformationPassword, {
    message: "Both Password should be same",
    path: ["conformationPassword"],
  });
