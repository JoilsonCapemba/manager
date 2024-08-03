import { Logo } from "@/components/Logo";
import { SocialLogin } from "@/components/SocialLogin";
import { createUser } from "@/services/UserServices";
//import { useState } from "react";

import axios from "axios"
import {XMLParser} from 'fast-xml-parser';
import { useState } from "react";


export default  function CreateAccount(){

  const loginService = async (telefone: string, password: string)  => {
    const url = 'https://a756-129-122-221-10.ngrok-free.app/ws/users.wsdl'
    const b = ''

    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.bikeshared.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:loginRequest>
                            <int:telephone>${telefone}</int:telephone>
                            <int:password>${password}</int:password>
                            <int:wifiCodig></int:wifiCodig>
                        </int:loginRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`

        let env = null
                
        const response = await axios.post(url, xmls,
            {
                headers:{
                    'Content-Type': 'text/xml'
                }
            }
        )
        const parser = new XMLParser()
        const jsonRes = parser.parse(response.data)
        const loginRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:loginResponse']
        
            const name = loginRes['ns2:name']
            const email = loginRes['ns2:email']
            const telephone = loginRes['ns2:telephone']
            const saldo = loginRes['ns2:saldo']
            const id = loginRes['ns2:id']
            const token = loginRes['ns2:token']
            const type = loginRes['ns2:type']
        
            const user = {
                id: id,
                name: name,
                email: email,
                telephone: telephone,
                saldo: saldo,
                token: token,
                type: type
            }

            console.log(user)

            if(type == 0) return null

            return user
        

    }
    catch(error){
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login.');
    }
}
  

    
  return(
    <main className="h-screen p-14 bg-[#2E2938] flex justify-center items-center">
      <form className="w-[381px] flex flex-col">
        <Logo />
        
        <p className="text-[#B4ACF9] mb-2">Nome</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs"  type="text"  placeholder="Nome Completo"/>

        <p className="text-[#B4ACF9] mb-2">Email</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs" type="email"  placeholder="please insert your e-mail adress"/>

        <p className="text-[#B4ACF9] mb-2">Password</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs" type="password"  placeholder="please insert your password adress"/>
        
        <p className="text-[#B4ACF9] mb-2">Telefone</p>
        <input className="h-[60px] bg-[#363041] rounded-md mb-6 pl-4 text-xs" type="number"  placeholder="please insert your password adress"/>
        

        <button  className="h-[60px] bg-[#B4ACF9] rounded-md text-[#2E2938]">crar conta</button>

        <p  className="text-white self-center mt-6">Nao tens uma conta?  Criar conta agora</p>
      </form>
    </main>
  )
}