import Link from "next/link";
import { CloudLightning } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <CloudLightning className={`${iconSizes[size]} text-blue-500`} />
      </div>
      <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
        CloudDrop
      </span>
    </Link>
  );
}
