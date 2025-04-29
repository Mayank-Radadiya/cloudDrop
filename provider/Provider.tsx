"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                backdropFilter: "blur(22px) saturate(114%)",
                WebkitBackdropFilter: "blur(22px) saturate(114%)",
                backgroundColor: "rgba(17, 25, 40, 0.66)",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                borderRadius: "8px",
                color: "var(--toast-text)",
                background: "var(--toast-bg)",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default Provider;
