'use client'  

import { Logo } from "@/components/Logo";  
import { useContext, useEffect, useState } from "react";  
import { loginService } from "@/services/UserServices";  
import { AuthProvider, Context } from "@/context";  
import { StationsContext } from "@/context/stationsContext";  
import { redirect, useRouter } from 'next/navigation' 

import {} from 'next/router' 

export default  function Login(){  

  console.log('teste')  

    const [senha, setsenha] = useState('')  
    const [telefone, settelefone] = useState('')  
    
    const context = useContext(Context)  
    const statioContext = useContext(StationsContext)  
    const router = useRouter() // Get the router instance  

    async function loginUser() {  
      //console.log('entrou')  
      console.log('outro teste')  
      try {  
        const login = await loginService(telefone, senha)  
        console.log('chegou')  
        if(login){  
          context?.setUser(login.name)  
          context?.setTelephone(login.telephone)  
          context?.setEmail(login.email)  
          redirect('/Dashboard')
          // Navigate to Dashboard using the router  
          router.push('/Dashboard');
           // Client-side navigation  
        } else {  
          // Handle unsuccessful login  
          console.error('Login failed');  
          // You might display an error message to the user here  
        }  
      } catch (error) {  
        console.error("Login Error:", error);  
        // Handle errors from the login service   
      }  
    } 

    let l = null
    useEffect(()=>{
      l = async ()=> await loginService(telefone, senha)
    },[])
    
    function goTo(){
          //context?.setUser('Joilson Capemba')  
          //context?.setTelephone("923649296")  
          //context?.setEmail('joilsoncapemba@gmail.com')
          //console.log('pau pau')
      const login = l

      console.log(login)

      if(login){
          context?.setUser(login.name)  
          context?.setTelephone(login.telephone)  
          context?.setEmail(login.email)
          
          
          router.push('Dashboard')
      } 
      else router.push('Login')
      console.log('bag')
    }

  return(  
    <AuthProvider>
    <main className="h-screen p-14 bg-[#2E2938] flex justify-center items-center">  
      <form action={goTo} className="w-[381px] flex flex-col">  
        <Logo />  
        
        <p className="text-[#B4ACF9] mb-2">Telefone</p>  
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(n) => settelefone(n.target.value)}  placeholder="please insert your password adress"/>  
        
        <p className="text-[#B4ACF9] mb-2">Password</p>  
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs text-white" onChange={(e) => setsenha(e.target.value)} type="password" placeholder="please insert your password adress"/>  
        

        <button type="submit" onClick={loginUser} className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]">Login</button>  

        <p className="text-white self-center mt-6">Nao tens uma conta?  <a href="/CreateAccount">Criar conta agora</a></p>  
      </form>  
    </main>  
    </AuthProvider>
  )  
}  