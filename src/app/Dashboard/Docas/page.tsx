'use client'


import { HeaderDashnoard } from "@/components/HeaderDashboard";
import { Task } from "@/components/Task";
import { getStations } from "@/services/StatiosServices";
import Profile from "../Profile/page";

export default function Estacoes(){

  const estacoes = getStations()
  console.log(estacoes)

  return(
    <main className="h-screen bg-[#2E2938] text-white">
      <HeaderDashnoard />

      <div className="max-w-[1004px] flex flex-col mx-auto gap-3 mt-[82px]">

        <p className="text-white text-2xl font-bold">Minha Estaçao</p>

        <p className="mb-4 text-[18px]">Regista Docas e gerir a Estação</p>


        <p className="text-white font-bold">Docas da estacao - <span>2</span></p>

        <div className="flex flex-col gap-2">
          <Task description="Doca 1"  state={"ocupada"}/>
          <Task description="Doca 2" state={'livre'}/>
          <Task description="Doca 3" state={'livre'}/>
          <Task description="Doca 4" state={'livre'}/>
        </div>
      </div>
    </main>
  )
}