'use client';

import { ButtonNormal } from "@/components/ButtonNormal";
import { HeaderTask } from "@/components/HeaderTask";
import { useAuthContext } from "@/context";
import Image from "next/image";

export default function Profile() {
  const { user, email, telephone } = useAuthContext();

  console.log('Dados no perfil:', user, email, telephone); // Verifique se os dados estão presentes aqui

  return (
    <main className="bg-[#2E2938] text-white">

      <div className="max-w-[611px] mx-auto mt-24">
        <HeaderTask title="Meu Perfil" description="Minhas informações"/>

        <div className="flex items-center gap-2 mb-6">
          <Image src="/img/MaskGroup.png" alt="avatar" width={96} height={96} />
          <div className="flex flex-col">
            <p className="text-xl text-white">{user || "Usuário não logado"}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs">Nome</p>
            <p className="mb-3">{user || "Nome não disponível"}</p>

            <p className="text-xs">Email</p>
            <p className="mb-3">{email || "Email não disponível"}</p>

            <p className="text-xs">Telefone</p>
            <p className="mb-3">{telephone || "Telefone não disponível"}</p>
            <p>
              <ButtonNormal action="../Dashboard" title="Voltar"/>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
