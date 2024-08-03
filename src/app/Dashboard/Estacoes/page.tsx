'use client'


import { HeaderDashnoard } from "@/components/HeaderDashboard";
import { Task } from "@/components/Task";
import { getStations } from "@/services/StatiosServices";

export default function Estacoes(){

  const estacoes = getStations()
  console.log(estacoes)

  return(
    <main className="h-screen bg-[#2E2938] text-white">
      <HeaderDashnoard />
      <div className="max-w-[1004px] flex flex-col mx-auto gap-3 mt-[82px]">

        <p className="text-white text-2xl font-bold">Minha Estaçao</p>

        <p className="mb-4 text-[18px]">Regista Docas e gerir a Estação</p>

        <p className="text-white font-bold">Informaçoes da estacao - <span>2</span></p>

        <div className="flex flex-col gap-2">
          <Task description="Kilamba"  state={"ocupada"}/>
          <Task description="25" state={'livre'}/>
        </div>
      </div>
    </main>
  )
}