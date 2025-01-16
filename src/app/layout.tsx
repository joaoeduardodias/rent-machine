import { RentMachineProvider } from "@/context/rent-machine";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RentMachineProvider>
          <Toaster richColors expand position="top-center" />
          <header className="bg-yellow-500 p-6 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-accent  cursor-pointer"
              >
                Rent Machine
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      href="/#about"
                      className="text-white hover:text-yellow-200"
                    >
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#maquinas"
                      className="text-white hover:text-yellow-200"
                    >
                      Máquinas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#servicos"
                      className="text-white hover:text-yellow-200"
                    >
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contato"
                      className="text-white hover:text-yellow-200"
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          {children}
          <footer className="bg-gray-800 text-white py-16">
            <div className="container  px-4 flex flex-wrap justify-center gap-16 items-start">
              <div className="w-full  md:max-w-72 mb-6 md:mb-0 text-center">
                <h5 className="text-xl font-bold mb-4">ConstrutAluga</h5>
                <p className="text-gray-400">
                  Soluções de aluguel para sua construção.
                </p>
              </div>
              <div className="w-full md:max-w-72 mb-6 md:mb-0 text-center">
                <h5 className="text-xl font-bold mb-4">Contato</h5>
                <p className="text-gray-400">
                  Email: contato@construtaluga.com
                </p>
                <p className="text-gray-400">Telefone: (11) 1234-5678</p>
              </div>
              <div className="w-full md:max-w-60 text-center">
                <h5 className="text-xl font-bold mb-4">Redes Sociais</h5>
                <div className="flex space-x-4 items-center justify-center">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </RentMachineProvider>
      </body>
    </html>
  );
}
