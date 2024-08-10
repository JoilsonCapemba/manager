import { ButtonNormal } from '@/components/ButtonNormal';
import { Logo } from '@/components/Logo';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="h-screen p-14 bg-[#2E2938]">
      <header className="flex justify-between">
        <Logo />
        <nav className="flex gap-x-11 text-white">
          <Link href="/Dashboard/RegistDoca" className="hover:text-[#B4ACF9]">
            Add Doca
          </Link>
          <Link href="/Dashboard" className="hover:text-[#B4ACF9]">
            Dashboard
          </Link>
          <Link href="/Dashboard/Estacao" className="hover:text-[#B4ACF9]">
            Estação
          </Link>
          <Link href="/Dashboard/Profile" className="hover:text-[#B4ACF9]">
            Perfil
          </Link>
          <Link href="/Dashboard/Docas" className="hover:text-[#B4ACF9]">
            Ver Docas
          </Link>
        </nav>
        <ButtonNormal action="Login" title="Sair" />
      </header>

      <section className="flex justify-between items-center flex-col md:flex-row">
        <article className="max-w-[608px] mt-8">
          <div className="font-bold text-4xl text-white mb-4">
            <span className="text-[#B4ACF9]">Gerencie a sua Estação do BikeShared</span>
          </div>
          <div className="text-white text-lg">Gere Docas</div>
          <div className="text-white text-lg">Visualize as informações da estação</div>
          <div className="text-white text-lg">Visualize as suas informações</div>
        </article>

        <div>
          <Image src="/img/ReadingList-cuate.svg" alt="imagem de capa" width={584} height={584} />
        </div>
      </section>
    </main>
  );
}
