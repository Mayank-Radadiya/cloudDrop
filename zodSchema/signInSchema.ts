import * as z from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Add valid email." }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should be contain 8 characters" }),
});
