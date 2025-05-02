"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { forgotPasswordSchema } from "@/zodSchema/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomToggleButton from "../custom/CustomToggleButton";
import { Logo } from "../custom/Logo";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import VerifyEmail from "./VerifyEmail";

const ResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const { signIn, isLoaded, setActive } = useSignIn();
  const [error, setError] = useState<ClerkAPIError[]>();

  // Form handle for password reset
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Verify OTP code using the VerifyEmail component
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!isLoaded) return;

    try {
      const completeReset = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: emailCode.join(""),
      });

      if (completeReset?.status === "needs_new_password") {
        toast.success(
          "Code verified successfully. Please set your new password."
        );
        setVerifying(false);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setError(error.errors);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset password submission
  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    if (!isLoaded) return;
    try {
      setLoading(true);

      const result = await signIn?.resetPassword({
        password: data.password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Password reset successful.");
        router.push("/sign-in");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setError(error.errors);
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {verifying ? (
        <VerifyEmail
          emailCode={emailCode}
          setEmailCode={setEmailCode}
          handleVerify={handleVerify}
          isLoading={loading}
          error={error}
        />
      ) : (
        <div
          className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4"
          style={{ backgroundImage: "var(--backgroundImage)" }}
        >
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <CustomToggleButton />
          </div>
          <Link
            href="/sign-in"
            className="absolute left-4 top-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to sign in</span>
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
                  Reset your password
                </CardTitle>
                <CardDescription>
                  Enter a new password for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        required
                        className="h-11 pr-10 mt-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-11 w-11"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                      {errors.password?.message && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        {...register("confirmPassword")}
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="h-11 pr-10 mt-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-11 w-11"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                      {errors.confirmPassword?.message && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            {error && (
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
      )}
    </>
  );
};

export default ResetPassword;
