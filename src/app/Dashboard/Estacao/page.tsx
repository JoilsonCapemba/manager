'use client';

import { useState, useEffect } from 'react';
import { HeaderDashnoard } from "@/components/HeaderDashboard";
import { Task } from "@/components/Task";
import { getStation } from "@/services/StationsServices";
import Link from 'next/link';
import { ButtonNormal } from '@/components/ButtonNormal';
import { Logo } from '@/components/Logo';

export default function Estacao() {
  const [stationDetails, setStationDetails] = useState<any>(null);

  useEffect(() => {
    const fetchStationDetails = async () => {
      const stationName = "Kilamba"; // Substitua pelo nome real da estação
      const details = await getStation(stationName);
      setStationDetails(details);
    };

    fetchStationDetails();
  }, []);

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
        <ButtonNormal action="Login" title="Sair" />
      </header>
      <div className="max-w-[1004px] flex flex-col mx-auto gap-3 mt-[82px]">

        <p className="text-white text-2xl font-bold">
          {stationDetails ? stationDetails.name : "Carregando..."}
        </p>

        <p className="mb-4 text-[18px]">Gerencie a sua Estação</p>

        {stationDetails ? (
          <div>
            <p className="text-white font-bold">Informações da estação</p>
            <div className="flex flex-col gap-2">
              <Task description="Capacidade" state={stationDetails.capacity.toString()} />
              <Task description="Docas Disponíveis" state={stationDetails.availableDocks.toString()} />
              <Task description="Localização" state={`${stationDetails.latitude}, ${stationDetails.longitude}`} />
            </div>
            
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
