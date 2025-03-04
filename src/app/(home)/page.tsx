import imgEscavadeira from "@/assets/escavadeira.png";
import { ArrowRight, Calendar, Phone, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ListMachines } from "./components/list-machines";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50">
      <section className="bg-yellow-400/70 pt-20 md:py-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between lg:px-0">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-center md:text-left text-4xl md:text-5xl font-bold mb-4">
              Alugue Máquinas de Construção com Facilidade
            </h2>
            <p className="text-xl text-center md:text-left mb-8 text-gray-700">
              Equipamentos de qualidade para sua obra, quando você precisar.
            </p>
            <Link
              href="/rent"
              className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full flex md:inline-flex items-center justify-center hover:bg-yellow-600 transition duration-300"
            >
              Alugar Agora
              <ArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="hidden md:inline-block">
            <Image
              src={imgEscavadeira}
              alt="ilustração escavadeira"
              priority
              width="600"
              height="400"
              className="w-[600px] h-[400px]"
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-8 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Sobre a Rent Machine
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://fakeimg.pl/600x400?text=sua+empresa"
                alt="Equipe Rent Machine"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg text-muted-foreground mb-4 text-center md:text-justify">
                A Rent Machine é líder no mercado de aluguel de máquinas para
                construção civil. Com anos de experiência, oferecemos
                equipamentos de alta qualidade e um serviço excepcional para
                garantir o sucesso do seu projeto.
              </p>
              <p className="text-lg text-center md:text-left text-muted-foreground">
                Nossa missão é simplificar o processo de aluguel de máquinas,
                proporcionando flexibilidade e eficiência para construtoras de
                todos os tamanhos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="machines" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Algumas de nossas máquinas
          </h3>
          <ListMachines />
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-16 text-center">
            Oferecemos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Truck className="size-12 text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">
                Entrega Rápida
              </h4>
              <p className="text-gray-600 text-center">
                Entregamos os equipamentos diretamente na sua obra, garantindo
                agilidade e praticidade.
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Calendar className="size-12 text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">
                Flexibilidade
              </h4>
              <p className="text-gray-600 text-center">
                Alugue pelo tempo que precisar, sem compromissos longos.
                Adaptamos às necessidades do seu projeto.
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Shield className="size-12 text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">
                Equipamentos Seguros
              </h4>
              <p className="text-gray-600 text-center">
                Todas as máquinas são regularmente inspecionadas e mantidas,
                garantindo segurança e confiabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
            Entre em Contato
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://fakeimg.pl/600x400?text=sua+empresa"
                alt="Atendimento ao cliente"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg text-center md:text-left text-muted-foreground mb-4">
                Estamos aqui para ajudar!
                <br /> Entre em contato conosco para tirar dúvidas, solicitar
                orçamentos ou agendar uma visita.
              </p>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Phone className="size-6 text-yellow-500 mr-2" />
                <span className="text-base md:text-lg text-gray-600 md:text-gray-800">
                  (67) 99890-8771
                </span>
              </div>
              <p className="text-base text-center md:text-lg md:text-left text-gray-600 mb-4">
                Ou envie-nos uma mensagem:
              </p>
              <Link
                href="https://wa.me/5567998908771?text=ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20para%20alugar%20uma%20m%C3%A1quina"
                target="_blank"
                className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full flex md:inline-flex items-center justify-center hover:bg-yellow-600 transition duration-300"
              >
                Enviar Mensagem
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
