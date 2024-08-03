import { HeaderDashnoard } from "@/components/HeaderDashboard";

export default function RegistDoca(){
  return(
    
    <main className="h-screen bg-[#2E2938] text-white">
      <HeaderDashnoard />
      <div className="max-w-[603px] mx-auto mt-[215px]">
        <div className="flex gap-2 mb-[58px]">
          <button className="bg-[#363041] rounded-full w-[56px] h-[56px]">-</button>
          <div className="flex flex-col">
            <p className="text-white text-2xl font-bold">Adicionar Doca</p>
            <p>Adiciona uma nova na Estação.</p>
          </div>

        </div>

        <form action="" className="flex flex-col ">
          <p className="text-xs text-[#B4ACF9] mb-2">Nome da Doca</p>
          <input type="text" placeholder="Nome da doca" className="bg-[#363041] rounded-md h-[60px] mb-8"/>

          <button className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]">Adicionar Doca</button>
        </form>
      </div>
    </main>
  )
}