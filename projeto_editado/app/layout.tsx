import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoShape - Controle Corporal Inteligente",
  description:
    "Sistema inteligente de controle corporal e disciplina fisica. Sua nova versao comeca hoje.",
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(0 0% 10%)",
              color: "hsl(0 0% 100%)",
              border: "1px solid hsl(0 0% 18%)",
            },
          }}
        />
      </body>
    </html>
  );
}
