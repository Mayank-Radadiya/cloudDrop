"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import CustomToggleButton from "../custom/CustomToggleButton";
import { Logo } from "../custom/Logo";
import { useState } from "react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { forgotPasswordEmailSchema } from "@/zodSchema/forgotPasswordSchema";

const ForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const [error, setError] = useState<ClerkAPIError[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordEmailSchema>>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordEmailSchema>) => {
    setLoading(true);
    setError(undefined);
    console.log(1);

    if (!isLoaded) {
      toast.error("Clerk is not loaded yet. Please try again.");
      return;
    }
    try {
      const { email } = data;
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      toast.success("OTP sent to your email. Please check your inbox.");
      router.push("/forgot-password/verification");
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4"
        style={{ backgroundImage: "var(--backgroundImage)" }}
      >
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <CustomToggleButton />
        </div>
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create New Password
              </CardTitle>
              <CardDescription>Enter your Email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-11 mt-1"
                  />
                  {errors.email?.message && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-11 w-full hover:bg-primary/70"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          {errors && error && (
            <div className="mt-4 p-4 rounded-xl border bg-red-100/60 dark:bg-red-900/30 border-red-300 dark:border-red-700">
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">
                Errors:
              </h3>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {error.map((el, index) => (
                  <li
                    key={index}
                    className="text-sm text-red-600 dark:text-red-300"
                  >
                    {el.longMessage}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPassword;
