import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
export function Header() {
  return (
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
              <Link href="/#about" className="text-white hover:text-yellow-200">
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
              <Button size="icon" variant="ghost" className="md:hidden m-0 p-0">
                <Menu className="!size-6 text-white" />
                <span className="sr-only">Abrir/fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="sm:max-w-72 flex items-center justify-center border-yellow-300 bg-yellow-500"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu</SheetDescription>
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
  );
}
