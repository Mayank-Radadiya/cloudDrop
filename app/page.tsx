"use client";
import CustomToggleButton from "@/components/global/custom/CustomToggleButton";
import { Logo } from "@/components/global/custom/Logo";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Share2,
  CloudLightning,
  LockIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <div className="flex min-h-screen flex-col w-full items-center sm:items-center">
      <header className="sticky top-0 z-20  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full items-center justify-between">
        <div className="container flex h-16 items-center justify-between w-full ml-24">
          <Logo />
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="border">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>

            <CustomToggleButton />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_50%)]"></div>
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-8"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
                    <span className="mr-1 flex h-2 w-2 rounded-full bg-primary"></span>
                    <span className="font-medium">Launching Soon</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Your files, <span className="text-primary">simplified</span>
                  </h1>
                  <p className="max-w-[600px] text-xl text-muted-foreground">
                    Store, share, and collaborate on files with ease. CloudDrop
                    makes file management intuitive and secure.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/sign-up" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Free 15GB storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 opacity-75 blur-xl"></div>
                  <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="h-8 border-b bg-muted/50">
                      <div className="flex h-full items-center gap-2 px-4">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="ml-2 h-full flex-1 bg-background/50"></div>
                      </div>
                    </div>
                    <img
                      src="/2.png"
                      alt="CloudDrop Dashboard"
                      className="object-cover w-[600px] h-[430px]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} id="features" className="py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything you need to manage your files
              </h2>
              <p className="text-xl text-muted-foreground">
                CloudDrop provides powerful features to help you store,
                organize, and share your files with ease.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Smart Organization</h3>
                <p className="text-muted-foreground">
                  Automatically organize your files with intelligent suggestions
                  and custom folder structures.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  <Share2 className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Seamless Sharing</h3>
                <p className="text-muted-foreground">
                  Share files and folders with anyone, set permissions, and
                  track who has access to your content.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  <LockIcon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Keep your files safe with end-to-end encryption, two-factor
                  authentication, and advanced security controls.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={statsRef} className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold md:text-4xl">2M+</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Active Users
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold md:text-4xl">10B+</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Files Stored
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold md:text-4xl">99.9%</div>
                <div className="mt-2 text-sm text-muted-foreground">Uptime</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold md:text-4xl">150+</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Countries
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground"
            >
              <div className="absolute inset-0 bg-[url('/Hero.png')] bg-cover bg-center opacity-10 mix-blend-overlay dark:text-white"></div>
              <div className="relative grid gap-6 p-8 md:grid-cols-2 md:p-12 lg:p-16">
                <div className="flex flex-col justify-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white/90">
                    Ready to get started?
                  </h2>
                  <p className="mb-6 max-w-md text-primary-foreground/80 dark:text-white/75">
                    Join millions of users who trust CloudDrop with their files.
                    Sign up today and get 15GB of free storage.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="group"
                    >
                      <Link href="/sign-up" className="gap-2">
                        Create Free Account
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10"
                    >
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <CloudLightning className="h-48 w-48 text-primary-foreground/20 md:h-64 md:w-64 dark:text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="py-1 bg-muted/10">
        <div className="container">
          <div className="flex flex-col items-center justify-between border-t border-muted-foreground/20 pt-8 md:flex-row w-full">
            <p className="mb-4 text-sm text-muted-foreground md:mb-0">
              © 2025 CloudDrop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
