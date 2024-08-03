import { ButtonNormal } from "@/components/ButtonNormal";
import { Logo } from "@/components/Logo";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="h-screen p-14 bg-[#2E2938] ">
      <header className="flex justify-between">
        <Logo />
        <nav className="flex gap-x-11 text-white">
          <a className="hover:text-[#B4ACF9]" href="Dashboard/RegistDoca">Add Doca</a>
          <a className="hover:text-[#B4ACF9]" href="Dashboard">Dashboard</a>
          <a className="hover:text-[#B4ACF9]" href="Dashboard/Estacao">Estação</a>
          <a className="hover:text-[#B4ACF9]" href="Dashboard/Profile">Perfil</a>
          <a className="hover:text-[#B4ACF9]" href="Dashboard/Docas">Ver Docas</a>
        </nav>     
        <ButtonNormal action="Login" title="Sair"/>
      </header>

      <section className="flex justify-between items-center flex-col md:flex-row">
        <article className="max-w-[608px] mt-8">
          <div className="font-bold  text-4xl text-white mb-4">
            <span className="text-[#B4ACF9]">Gerencia a sua Estação do BikeShared</span> 
          </div>
          <div className="text-white text-lg">Gere Docas</div>
          <div className="text-white text-lg">Visualize as informações da estação</div>
          <div className="text-white text-lg">Visualize as suas informações</div>
          
        </article>

        <div>
        <Image src="/img/ReadingList-cuate.svg" alt="imagem de capa" width={584} height={584}/>
        </div>
      </section>


    </main>
  );
}