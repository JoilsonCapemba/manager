'use client'

import { Logo } from "@/components/Logo";
import { useContext, useState } from "react";
import { loginService } from "@/services/UserServices";
import { Context } from "@/context";
import { StationsContext } from "@/context/stationsContext";
import { useRouter } from 'next/router'

export default  function Login(){

  console.log('teste')

    const [senha, setsenha] = useState('')
    const [telefone, settelefone] = useState('')
    

    const context = useContext(Context)

    const statioContext = useContext(StationsContext)


    async function loginUser() {
      console.log('entrou')
      console.log('outro teste')
      const login = await loginService(telefone,senha)
      console.log('chegou')
      //const stations = await getStations()
      if(login){
        context?.setUser(login.name)
        context?.setTelephone(login.telephone)
        context?.setEmail(login.email)
        
      }
    }

    

  return(
    <main className="h-screen p-14 bg-[#2E2938] flex justify-center items-center">
      <form className="w-[381px] flex flex-col">
        <Logo />
        
        <p className="text-[#B4ACF9] mb-2">Telefone</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs" onChange={(n) => settelefone(n.target.value)}  placeholder="please insert your password adress"/>
        
        <p className="text-[#B4ACF9] mb-2">Password</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs" onChange={(e) => setsenha(e.target.value)} type="password" placeholder="please insert your password adress"/>
        

        <button onClick={loginUser} className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]"> <a href="/Dashboard">Login</a></button>

        <p className="text-white self-center mt-6">Nao tens uma conta?  <a href="/CreateAccount">Criar conta agora</a></p>
      </form>
    </main>
  )
}
