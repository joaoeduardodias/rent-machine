import { RentMachineProvider } from "@/context/rent-machine";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Rent Machine",
  description: "Alugue a maquina que você precisa na sua obra com facilidade.",
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
      <body className={`${inter.variable} antialiased`}>
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
