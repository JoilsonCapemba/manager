'use client'
 
import { Logo } from "@/components/Logo";
import { SocialLogin } from "@/components/SocialLogin";
import { createUser } from "@/services/UserServices";
import { useRouter } from 'next/navigation';
//import { useState } from "react";
import { useState } from "react";


export default  function CreateAccount(){

    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [telefone, settelefone] = useState('')

    const router = useRouter()
    

    const NavigateTo = () => {  
      const router = useRouter();  
      router.push('/Dashboard');  
    }; 


    async function hundlecreateAccount(){
        NavigateTo
        const user = {
            name: name,
            email: email,
            telefone: telefone,
            senha: senha,
            tipo: 2,
            enderecoMac: 'XXX xxx xxx'
        }
    
        createUser(user)
        

      }

      async function goTo(){
        const user = {
          name: name,
          email: email,
          telefone: telefone,
          senha: senha,
          tipo: 2,
          enderecoMac: 'XXX xxx xxx'
      }
        const create = await createUser(user)
        if(create) router.push('Login')
        else router.push('Login')
        
      }



    
  return(
    <main className="h-screen p-14 bg-[#2E2938] flex justify-center items-center">
      <form action={goTo} className="w-[381px] flex flex-col">
        <Logo />
        
        <p className="text-[#B4ACF9] mb-2">Nome</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(n) => setName(n.target.value)}  type="text"  placeholder="Nome Completo"/>

        <p className="text-[#B4ACF9] mb-2">Email</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(e) => setemail(e.target.value)} type="email"  placeholder="please insert your e-mail adress"/>

        <p className="text-[#B4ACF9] mb-2">Password</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(n) => setsenha(n.target.value)} type="password"  placeholder="please insert your password adress"/>
        
        <p className="text-[#B4ACF9] mb-2">Telefone</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(n) => settelefone(n.target.value)} type="number"  placeholder="please insert your password adress"/>
        

        <button onClick={hundlecreateAccount} className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]">crar conta</button>
      </form>
    </main>
  )
}