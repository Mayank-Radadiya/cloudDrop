"use client";

import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";

// Zod custom schema
import { signUpSchema } from "@/zodSchema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { ArrowLeft, EyeOff, Eye, Loader2 } from "lucide-react";
import CustomToggleButton from "../custom/CustomToggleButton";
import { Logo } from "../custom/Logo";
import Link from "next/link";
import VerifyEmail from "./VerifyEmail";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Error handling
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [error, setError] = useState<ClerkAPIError[]>();

  // Form handle
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      conformationPassword: "",
    },
  });
  console.log("SignUpForm rendered");

  // When user submit data from form.
  // Create a new user on clerk and send verification email.
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification email sent. Please check your inbox.");
      setVerifying(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) setError(error.errors);
      toast.error("Error during sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // check if user is verifying email or not
  const verification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!isLoaded) return;
    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: emailCode.join(""),
      });

      if (result?.status === "complete") {
        toast.success("Email verified successfully.");
        await setActive({ session: result.createdSessionId });
      }

      router.push("/dashboard");
    } catch (error) {
      if (isClerkAPIResponseError(error)) setError(error.errors);
      toast.error(
        "Error during verification. Please try again sign-up process."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!verifying ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
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
                  Create an account
                </CardTitle>
                <CardDescription>
                  Enter your information to get started
                </CardDescription>
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
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        required
                        className="h-11 pr-10  mt-1"
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
                        {...register("conformationPassword")}
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="h-11 pr-10  mt-1"
                      />
                      <div id="clerk-captcha mt-4" />{" "}
                      {/* This is required for Smart CAPTCHA */}
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
                      {errors.conformationPassword?.message && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.conformationPassword.message}
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
                        Creating account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
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
      ) : (
        <>
          <VerifyEmail
            emailCode={emailCode}
            setEmailCode={setEmailCode}
            handleVerify={verification}
            isLoading={loading}
            error={error}
          />
        </>
      )}
    </>
  );
};

export default SignUpForm;
