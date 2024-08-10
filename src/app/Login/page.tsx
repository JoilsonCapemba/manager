'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context";
import { loginService } from "@/services/UserServices";
import { Logo } from "@/components/Logo";

export default function Login() {
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const { setUser, setTelephone, setEmail } = useAuthContext();
  const router = useRouter();

  async function loginUser(event: React.FormEvent) {
    event.preventDefault();
    console.log('Iniciando login...');
    try {
      const login = await loginService(telefone, senha);
      console.log('Resposta do login:', login);
      if (login) {
        setUser(login.name);
        setTelephone(login.telephone);
        setEmail(login.email);
        console.log('Contexto atualizado:', login.name, login.telephone, login.email);
        router.push('/Dashboard');
      } else {
        console.error('Login falhou');
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  return (
    <main className="h-screen p-14 bg-[#2E2938] flex justify-center items-center">
      <form onSubmit={loginUser} className="w-[381px] flex flex-col">
        <Logo />

        <p className="text-[#B4ACF9] mb-2">Telefone</p>
        <input
          className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white"
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Insira seu número de telefone"
        />

        <p className="text-[#B4ACF9] mb-2">Senha</p>
        <input
          className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white"
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          placeholder="Insira sua senha"
        />

        <button
          type="submit"
          className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]"
        >
          Login
        </button>

        <p className="text-white self-center mt-6">
          Não tem uma conta? <a href="/CreateAccount">Criar conta agora</a>
        </p>
      </form>
    </main>
  );
}
