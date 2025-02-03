import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
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
          <p className="text-gray-400">Email: contato@construtaluga.com</p>
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
  );
}
