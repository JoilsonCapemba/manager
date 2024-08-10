'use client';

import { useState } from 'react';
import { HeaderDashnoard } from "@/components/HeaderDashboard";
import { addDock } from "@/services/StationsServices"; // Certifique-se de que esta função está importada corretamente
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { ButtonNormal } from '@/components/ButtonNormal';

export default function RegistDoca() {
  const [dockName, setDockName] = useState(''); // Estado para o nome da doca
  const [dockInfo, setDockInfo] = useState(''); // Estado para a informação adicional da doca
  const [loading, setLoading] = useState(false); // Estado para o botão de loading

  const handleAddDock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Dados da nova doca conforme o formulário
      const newDock = {
        reference: dockName,
        state: 1, // Estado inicial (ou você pode gerar dinamicamente ou usar outro valor padrão)
        info: dockInfo, // Informação adicional preenchida pelo usuário
      };

      // Chamada para adicionar a nova doca. Substitua `1` pelo ID real da estação.
      const success = await addDock(1, newDock);

      if (!success) {
        alert('Doca adicionada com sucesso!');
        setDockName(''); // Limpar o campo após sucesso
        setDockInfo(''); // Limpar o campo de info após sucesso
      } else {
        alert('Erro ao adicionar a doca. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao adicionar a doca:', error);
      alert('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
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
        <ButtonNormal action="Login" title="Sair" />
      </header>
      <div className="max-w-[603px] mx-auto mt-[20px]">
        <div className="flex gap-2 mb-[58px]">
          <div className="flex flex-col">
            <p className="text-white text-2xl font-bold">Adicionar Doca</p>
            <p>Adiciona uma nova doca na Estação.</p>
          </div>
        </div>

        <form onSubmit={handleAddDock} className="flex flex-col">
          <p className="text-xs text-[#B4ACF9] mb-2">Nome da Doca</p>
          <input
            type="text"
            placeholder="Nome da doca"
            value={dockName}
            onChange={(e) => setDockName(e.target.value)}
            className="bg-[#363041] rounded-md h-[60px] mb-8 p-4 text-white"
            required
          />

          <p className="text-xs text-[#B4ACF9] mb-2">Informações da Doca</p>
          <textarea
            placeholder="Informações adicionais sobre a doca"
            value={dockInfo}
            onChange={(e) => setDockInfo(e.target.value)}
            className="bg-[#363041] rounded-md h-[120px] mb-8 p-4 text-white"
            required
          />

          <button
            type="submit"
            className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938] flex items-center justify-center"
            disabled={loading}
          >
            {loading ? 'Adicionando...' : 'Adicionar Doca'}
          </button>
        </form>
      </div>
    </main>
  );
}
