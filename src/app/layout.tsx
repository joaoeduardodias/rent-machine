import { RentMachineProvider } from "@/context/rent-machine";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentMachine",
  description: "Alugue a maquina que você precisa na sua obra conm facilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <RentMachineProvider>
              <Toaster richColors expand position="top-right" />
              {children}
            </RentMachineProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
