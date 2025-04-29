"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomToggleButton from "../custom/CustomToggleButton";
import { Logo } from "../custom/Logo";
import { ClerkAPIError } from "@clerk/types";

interface VerifyEmailProps {
  emailCode: string[];
  setEmailCode: (code: string[]) => void;
  handleVerify: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  error: ClerkAPIError[] | undefined;
}

export default function VerifyEmail({
  emailCode,
  setEmailCode,
  handleVerify,
  isLoading,
  error,
}: VerifyEmailProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Update the emailCode array
    const newOtp = [...emailCode];
    newOtp[index] = value;
    setEmailCode(newOtp);

    // Move to the next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to the previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !emailCode[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <CustomToggleButton />
      </div>
      <Link
        href="/sign-up"
        className="absolute left-4 top-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to sign up</span>
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
              Verify your email
            </CardTitle>
            <CardDescription>
              We&apos;ve sent a verification code to your email. Please enter it
              below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleVerify}>
              <div className="flex justify-center gap-2">
                {emailCode.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="h-14 w-14 text-center text-lg"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="h-11 w-full"
                disabled={isLoading || emailCode.join("").length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">
              Didn&apos;t receive a code?{" "}
            </div>
            <div className="text-sm text-muted-foreground">
              <Link
                href="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Back to sign in
              </Link>
            </div>
          </CardFooter>
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
  );
}
