import { Button } from "@/components/ui/button"
import { Home, Image as ImageIcon, LogOut, Truck } from "lucide-react"
import Link from "next/link"

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
  {
    title: "Imagens",
    href: "/dash/images",
    icon: <ImageIcon className="mr-2 h-4 w-4" />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-52 bg-white shadow-md border-r border-primary">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mt-4 mb-4">Dashboard</h2>
            <nav>
              <ul className="space-y-2">
                {sidebarNavItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <Button variant="ghost" className="w-full justify-start">
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
            <Link href="/">
              <Button variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sair do Admin
              </Button>
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

