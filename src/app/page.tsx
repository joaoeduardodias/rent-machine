import imgEscavadeira from "@/assets/escavadeira.png";
import imgPaCarregadeira from "@/assets/pa-carregadeira.png";
import imgRetroescavadeira from "@/assets/retroescavadeira.png";
import imgRolo from "@/assets/rolo.png";
import { ArrowRight, Calendar, Phone, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const machines = [
  {
    name: "Escavadeira",
    image: imgEscavadeira,
  },
  {
    name: "Retroescavadeira",
    image: imgRetroescavadeira,
  },
  {
    name: "Pá Carregadeira",
    image: imgPaCarregadeira,
  },
  {
    name: "Rolo Compactador",
    image: imgRolo,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50">
      <section className="bg-yellow-400/70 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Alugue Máquinas de Construção com Facilidade
              </h2>
              <p className="text-xl mb-8 text-gray-700">
                Equipamentos de qualidade para sua obra, quando você precisar.
              </p>
              <Link
                href="/rent"
                className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full inline-flex items-center hover:bg-yellow-600 transition duration-300"
              >
                Alugar Agora
                <ArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
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
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Sobre a RentMachine
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://fakeimg.pl/600x400?text=sua+empresa"
                alt="Equipe RentMachine"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg text-muted-foreground mb-4 text-justify">
                A RentMachine é líder no mercado de aluguel de máquinas para
                construção civil. Com anos de experiência, oferecemos
                equipamentos de alta qualidade e um serviço excepcional para
                garantir o sucesso do seu projeto.
              </p>
              <p className="text-lg text-muted-foreground">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {machines.map((machine, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={
                    machine.image ||
                    "https://fakeimg.pl/400x300?text=img+maquinas"
                  }
                  alt={machine.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-contain p-2"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{machine.name}</h4>
                  <Link
                    href="/rent"
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-16 text-center">
            Oferecemos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Truck className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">
                Entrega Rápida
              </h4>
              <p className="text-gray-600 text-center">
                Entregamos os equipamentos diretamente na sua obra, garantindo
                agilidade e praticidade.
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Calendar className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">
                Flexibilidade
              </h4>
              <p className="text-gray-600 text-center">
                Alugue pelo tempo que precisar, sem compromissos longos.
                Adaptamos às necessidades do seu projeto.
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />
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
              <p className="text-lg text-gray-600 mb-4 text-left ">
                Estamos aqui para ajudar!
                <br /> Entre em contato conosco para tirar dúvidas, solicitar
                orçamentos ou agendar uma visita.
              </p>
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-yellow-500 mr-2" />
                <span className="text-lg">(67) 99890-8771</span>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Ou envie-nos uma mensagem:
              </p>
              <Link
                href="https://wa.me/5567998908771?text=ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20para%20alugar%20uma%20m%C3%A1quina"
                target="_blank"
                className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full inline-flex items-center hover:bg-yellow-600 transition duration-300"
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
