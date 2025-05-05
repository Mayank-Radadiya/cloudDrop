"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CloudLightning,
  Download,
  FileText,
  LockIcon,
  Shield,
  Star,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/global/custom/Logo";
import CustomToggleButton from "@/components/global/custom/CustomToggleButton";

export default function Home() {
  const user = useUser();

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/20 w-full shadow-md pl-24">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#security"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Security
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {!user.isSignedIn && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/sign-in" className="text-sm font-medium">
                  Sign In
                </Link>
              </Button>
            )}
            {user.isSignedIn ? (
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/sign-up" className="text-sm font-medium">
                  Get Started
                </Link>
              </Button>
            )}
            <CustomToggleButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 blur-3xl opacity-40" />
          </div>

          <div className="container relative">
            <div className="text-center max-w-[800px] mx-auto mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
                  Store, share and collaborate with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                    CloudDrop
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-[600px] mx-auto">
                  The secure cloud storage platform designed for individuals and
                  teams. Store your files, share with anyone, and collaborate in
                  real-time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white relative overflow-hidden group"
                  >
                    <span className="absolute top-0 right-0 w-12 h-full bg-white/20 transform translate-x-[-100%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    <Link href="/sign-up" className="flex items-center gap-2">
                      Start Free Trial
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="#features" className="flex items-center gap-2">
                      Explore Features
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-lg border border-border/40 shadow-2xl bg-background/80 backdrop-blur-md mx-auto max-w-[1000px]"
            >
              <div className="absolute -top-[20px] left-1/2 transform -translate-x-1/2 bg-background border border-border/40 rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="pt-10 p-4 md:p-6">
                <img
                  src="/2.png"
                  alt="CloudDrop Dashboard"
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-[900px] mx-auto">
              {[
                { label: "Files Stored", value: "1B+" },
                { label: "Active Users", value: "2M+" },
                { label: "Countries", value: "150+" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center justify-center p-4 border border-border/30 rounded-xl bg-background/50 backdrop-blur-sm"
                >
                  <span className="text-3xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="currentColor"
                fillOpacity="0.05"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-muted/20 relative">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Powerful features for modern workflows
                </h2>
                <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                  CloudDrop combines powerful cloud storage with intuitive
                  design to make file management simple.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Upload className="h-10 w-10 text-primary" />,
                  title: "Easy File Upload",
                  description:
                    "Drag and drop files directly into CloudDrop or use our smart uploader to automatically organize your content.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Secure Storage",
                  description:
                    "Your files are protected with end-to-end encryption and advanced security protocols that exceed industry standards.",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Team Collaboration",
                  description:
                    "Work together in real-time with commenting, version control, and seamless sharing capabilities.",
                },
                {
                  icon: <Download className="h-10 w-10 text-primary" />,
                  title: "Fast Access",
                  description:
                    "Access your files from anywhere with our high-speed content delivery network optimized for global reach.",
                },
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Smart Organization",
                  description:
                    "Let our AI automatically categorize your files or create your own custom organization system.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Instant Sync",
                  description:
                    "Changes sync instantly across all your devices, keeping your files up-to-date everywhere.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col p-6 rounded-xl bg-card border border-border/30 hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="mb-4 p-2 rounded-full bg-primary/10 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 flex justify-center">
              <Button
                size="lg"
                className="bg-primary/90 hover:bg-primary text-white"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  Try All Features Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl opacity-50" />
          </div>

          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  How CloudDrop works
                </h2>
                <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                  Our simple workflow keeps your files organized and your team
                  productive.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              {/* Connector Line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

              {[
                {
                  step: "01",
                  title: "Upload your files",
                  description:
                    "Drag and drop files into your secure CloudDrop account or use the desktop app for automatic syncing.",
                  align: "left",
                },
                {
                  step: "02",
                  title: "Organize with ease",
                  description:
                    "Use folders, tags, and smart filters to keep your files organized your way.",
                  align: "right",
                },
                {
                  step: "03",
                  title: "Share securely",
                  description:
                    "Share files and folders with custom permissions, password protection, and expiry dates.",
                  align: "left",
                },
                {
                  step: "04",
                  title: "Collaborate in real-time",
                  description:
                    "Work together on documents with comments, version history, and live editing.",
                  align: "right",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex items-center mb-16 ${
                    item.align === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block w-1/2 ${
                      item.align === "left"
                        ? "text-right pr-12"
                        : "text-left pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block p-6 rounded-xl bg-background border border-border/30 shadow-md ${
                        item.align === "left" ? "text-left" : "text-right"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex md:justify-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-xl font-bold shadow-md">
                      {item.step}
                    </div>
                  </div>

                  <div className="md:hidden ml-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>

                  <div
                    className={`hidden md:block w-1/2 ${
                      item.align === "right"
                        ? "text-right pr-12"
                        : "text-left pl-12"
                    }`}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section
          id="security"
          className="py-20 md:py-32 bg-gradient-to-b from-muted/20 to-background"
        >
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="border border-border/40 rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm p-3">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LockIcon className="h-32 w-32 text-primary/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                    <div className="absolute inset-0">
                      <div className="h-full w-full flex flex-col">
                        <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-1 p-3">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className="rounded bg-primary/5 border border-primary/10 flex items-center justify-center"
                            >
                              <Shield className="h-4 w-4 text-primary/40" />
                            </div>
                          ))}
                        </div>
                        <div className="h-12 bg-card border-t border-border/30 flex items-center justify-center">
                          <div className="h-6 w-3/4 rounded-full bg-primary/10"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Enterprise-grade security for your data
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Your data deserves the highest level of protection. CloudDrop
                  provides military-grade encryption at rest and in transit,
                  ensuring your files remain private and secure.
                </p>

                <div className="space-y-4">
                  {[
                    "End-to-end encryption for all files",
                    "Two-factor authentication support",
                    "Advanced access controls and permissions",
                    "Regular security audits and compliance",
                    "Data loss prevention features",
                    "GDPR and HIPAA compliant",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/5"
                  >
                    <Link href="#" className="flex items-center gap-2">
                      Learn More About Security
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Trusted by thousands of companies
                </h2>
                <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                  See why businesses and individuals choose CloudDrop for their
                  storage needs.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "CloudDrop transformed how our team collaborates. The interface is intuitive and the security features give us peace of mind.",
                  author: "Sarah Johnson",
                  title: "CTO, TechInnovate",
                  rating: 5,
                  image: "/1.png",
                },
                {
                  quote:
                    "I've tried many cloud storage solutions, but CloudDrop stands out with its smart organization features and lightning-fast sync.",
                  author: "Mark Thompson",
                  title: "Freelance Designer",
                  rating: 5,
                  image: "/2.png",
                },
                {
                  quote:
                    "The security features are unmatched. Our sensitive client data is protected while still being easily accessible to our team.",
                  author: "Jessica Chen",
                  title: "Legal Director, ParallaxLaw",
                  rating: 5,
                  image: "/3.png",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl p-6 border border-border/30 bg-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="italic mb-6 text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
              {[
                "TechCorp",
                "Innovate Inc",
                "GlobalServe",
                "FutureWorks",
                "Momentum",
              ].map((company, index) => (
                <div
                  key={index}
                  className="text-xl font-bold text-muted-foreground/50"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-muted/20">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Simple, transparent pricing
                </h2>
                <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                  Choose the plan that works for you, from individual to
                  enterprise solutions.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "For individual use",
                  features: [
                    "15GB of storage",
                    "Basic file sharing",
                    "Mobile app access",
                    "Standard support",
                  ],
                  buttonText: "Sign Up Free",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For professionals",
                  features: [
                    "100GB of storage",
                    "Advanced sharing controls",
                    "Version history (30 days)",
                    "Priority support",
                    "No ads",
                  ],
                  buttonText: "Start Free Trial",
                  highlight: true,
                },
                {
                  name: "Business",
                  price: "$19.99",
                  period: "/user/month",
                  description: "For teams and businesses",
                  features: [
                    "Unlimited storage",
                    "Admin controls",
                    "Advanced security",
                    "API access",
                    "24/7 support",
                    "Custom branding",
                  ],
                  buttonText: "Contact Sales",
                  highlight: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-xl overflow-hidden border ${
                    plan.highlight
                      ? "border-primary shadow-xl shadow-primary/10 scale-[1.05] z-10"
                      : "border-border/40"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-6 ${plan.highlight ? "pt-8" : ""}`}>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {plan.description}
                    </p>

                    <Button
                      className={`w-full mb-6 ${
                        plan.highlight
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : "bg-card hover:bg-muted border border-border/60"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center text-muted-foreground">
              All plans include SSL encryption and basic support.
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                  Get answers to common questions about CloudDrop.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How secure is CloudDrop?",
                  answer:
                    "CloudDrop uses industry-leading security measures including end-to-end encryption, two-factor authentication, and regular security audits to keep your data safe.",
                },

                {
                  question: "How does file sharing work?",
                  answer:
                    "You can share files or folders with specific people via email invitations or generate links with custom permissions, password protection, and expiration dates.",
                },
                {
                  question: "Is there a file size limit?",
                  answer:
                    "Free accounts can upload files up to 2GB in size. Pro and Business accounts can upload files up to 50GB in size.",
                },
                {
                  question: "Can I recover deleted files?",
                  answer:
                    "Pro and Business accounts include a trash feature that keeps deleted files for 30 days. Business accounts can extend this period up to 180 days.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-lg border border-border/40 p-6 bg-card"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
          </div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center rounded-2xl p-12 bg-background/80 backdrop-blur-md border border-primary/20 shadow-xl"
            >
              <div className="absolute -z-10 top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent rounded-t-2xl"></div>
              <CloudLightning className="h-16 w-16 text-primary mx-auto mb-6" />

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to simplify your file management?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of individuals and teams who use CloudDrop to
                store, share, and collaborate on their files.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Link href="/sign-up" className="flex items-center gap-2">
                    Start Your Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/sign-in" className="flex items-center gap-2">
                    Sign In
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required. Start with 15GB free.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/20 py-12 w-full pl-24 m-2">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Logo />
              <p className="mt-4 text-muted-foreground max-w-xs">
                CloudDrop is the secure cloud storage platform that makes
                storing, sharing, and collaborating on files effortless.
              </p>
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.518 18.691a.625.625 0 01-.854.222c-2.338-1.43-5.288-1.756-8.764-.963a.625.625 0 01-.222-1.229c3.809-.868 7.07-.495 9.619 1.115a.625.625 0 01.221.855zm1.476-3.284a.78.78 0 01-1.069.284c-2.676-1.645-6.76-2.122-9.932-1.16a.781.781 0 01-.979-.501.781.781 0 01.501-.979c3.627-1.102 8.147-.569 11.196 1.288a.781.781 0 01.283 1.068zm.127-3.423c-3.213-1.91-8.5-2.086-11.562-1.153a.938.938 0 11-.543-1.797c3.532-1.072 9.405-.865 13.115 1.338a.938.938 0 01-1.011 1.573v.039z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} CloudDrop. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
