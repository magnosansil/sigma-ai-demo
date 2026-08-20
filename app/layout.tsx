import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGMA — Performance, Elevated",
  description: "Roupas e acessórios esportivos de alta performance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
