import * as z from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Add valid email." }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should be contain 8 characters" })
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});
