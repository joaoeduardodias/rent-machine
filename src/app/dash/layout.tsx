"use client";
import { Button } from "@/components/ui/button";
import { ModalsProvider } from "@/context/modal-context";
import { Home, LogOut, Truck } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dash",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    title: "Máquinas",
    href: "/dash/machines",
    icon: <Truck className="mr-2 h-4 w-4" />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <ModalsProvider>
        <aside className="w-52 bg-white shadow-md border-r border-primary">
          <div className="flex flex-col h-full">
            <div className="p-4">
              <h2 className="text-lg font-semibold mt-4 mb-4">Dashboard</h2>
              <nav>
                <ul className="space-y-2">
                  {sidebarNavItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {item.icon}
                          {item.title}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair do Admin
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </ModalsProvider>
    </div>
  );
}
