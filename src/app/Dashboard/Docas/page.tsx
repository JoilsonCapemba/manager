'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStation } from "@/services/StationsServices";
import Link from 'next/link';;
import { Logo } from '@/components/Logo';
import { useAuthContext } from '@/context';

export default function Docas() {
  const [stationDetails, setStationDetails] = useState<any>(null);
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/Login'); // Redireciona para a página de login se o usuário não estiver logado
      return;
    }

    const fetchStationDetails = async () => {
      const stationName = "Kilamba"; // Substitua pelo nome real da estação
      const details = await getStation(stationName);
      setStationDetails(details);
    };

    fetchStationDetails();
  }, [user, router]);

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    router.push('/Login'); // Redireciona para a página de login
  };

  return (
    <main className="h-screen bg-[#2E2938] p-14 text-white">
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
        <button onClick={handleLogout} className="bg-[#B4ACF9] rounded-md text-[#2E2938] p-2">
          Sair
        </button>
      </header>
      <div className="max-w-[1004px] flex flex-col mx-auto gap-3 mt-[82px]">

        <p className="text-white text-2xl font-bold">
          {stationDetails ? stationDetails.name : "Carregando..."}
        </p>

        <p className="mb-4 text-[18px]">Informação das Docas Disponíveis</p>

        {stationDetails ? (
          <div>
            {/* Seção para exibir as docas */}
            {stationDetails.docks && stationDetails.docks.length > 0 && (
              <div className="mt-4">
                <p className="text-white font-bold">Docas</p>
                {stationDetails.docks.map((dock: any, index: number) => (
                  <div key={index} className="bg-[#38334B] p-4 rounded-lg mb-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Doca {index + 1}</span>
                    </div>
                    <div className="mt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <span>ID: {dock.idDock}</span>
                        <span>Estado: {dock.state}</span>
                        <span>Referência: {dock.reference}</span>
                        <span>Info: {dock.info}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          <p>Carregando informações da estação...</p>
        )}

      </div>
    </main>
  );
}
