import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Facebook, Instagram, Linkedin, Menu } from "lucide-react"
import Link from "next/link"

export default function LandPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

<>

<header className="bg-yellow-500 p-6 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold text-accent  cursor-pointer"
      >
        Rent Machine
      </Link>
      <nav>
        <ul className="hidden md:flex space-x-4">
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
              href="/#machines"
              className="text-white hover:text-yellow-200"
            >
              Máquinas
            </Link>
          </li>
          <li>
            <Link
              href="/#services"
              className="text-white hover:text-yellow-200"
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-white hover:text-yellow-200"
            >
              Contato
            </Link>
          </li>
        </ul>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden m-0 p-0"
            >
              <Menu className="!size-6 text-white" />
              <span className="sr-only">Abrir/fechar menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="sm:max-w-72 flex items-center justify-center border-yellow-300 bg-yellow-500"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Menu
            </SheetDescription>
            <ul className="space-y-4 text-2xl flex items-center justify-center flex-col">
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
                  href="/#machines"
                  className="text-white hover:text-yellow-200"
                >
                  Máquinas
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white hover:text-yellow-200"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-white hover:text-yellow-200"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
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

</>
  )
}

