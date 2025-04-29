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
import { ArrowLeft, EyeOff, Eye, Loader2 } from "lucide-react";
import CustomToggleButton from "../custom/CustomToggleButton";
import { Logo } from "../custom/Logo";
import { useState } from "react";
import Link from "next/link";
import z from "zod";
import { signInSchema } from "@/zodSchema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";

interface SignInFormProps {}

const SignInForm = ({}: SignInFormProps) => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<ClerkAPIError[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    setError(undefined);

    if (!isLoaded) {
      toast.error("Clerk is not loaded yet. Please try again.");
      return;
    }
    try {
      const { identifier, password } = data;
      const signInAttempt = await signIn.create({
        identifier,
        password,
      });

      if (signInAttempt.status === "complete") {
        setActive({ session: signInAttempt.createdSessionId });
        toast.success("Sign in successful!");
        // Redirect to the dashboard or home page
        router.push("/dashboard");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setError(err.errors);
      toast.error("Error signing in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("identifier")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-11 mt-1"
                  />
                  {errors.identifier?.message && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      id="password"
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
                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign up
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
    </>
  );
};

export default SignInForm;
