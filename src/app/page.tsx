import { ButtonNormal } from "@/components/ButtonNormal";
import { Logo } from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen p-14 bg-[#2E2938] ">
      <header className="flex justify-between">
        <Logo />
        <nav className="flex gap-x-11 text-white">
          
        </nav>     
        <ButtonNormal action="Login" title="Fazer login"/>
      </header>

      <section className="flex justify-between items-center flex-col md:flex-row">
        <article className="max-w-[608px] mt-8">
          <div className="font-bold  text-4xl text-white mb-4">
            <span className="text-[#B4ACF9]">BikeShared</span> Desloca-se com facilidade e torna a sua vida mais facil
          </div>
          <div className="text-white text-lg">Compartilhamento de Bicicletast</div>
          <ButtonNormal action="CreateAccount"  title="Criar Conta"/>
        </article>

        <div>
          <Image src="/img/ReadingList-cuate.svg" alt="imagem de capa" width={584} height={584}/>
        </div>
      </section>


    </main>
  );
}
