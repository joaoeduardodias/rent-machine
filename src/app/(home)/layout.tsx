"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
