'use server'

import axios from "axios"
import {XMLParser} from 'fast-xml-parser';


type Userprops = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

const url = 'https://90b6-129-122-244-245.ngrok-free.app///ws/users.wsdl'

export const createUser = async (user: Userprops)  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:createUserRequest>
                            <int:userInfo>
                                <int:userId>?</int:userId>
                                <int:name>${user.name}</int:name>
                                <int:email>${user.email}</int:email>
                                <int:telephone>${user.telefone}</int:telephone>
                                <int:password>${user.senha}</int:password>
                                <int:type>${user.tipo}</int:type>
                                <int:macAddress>${user.enderecoMac}</int:macAddress>
                            </int:userInfo>
                        </int:createUserRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`

        const response = await axios.post(url, xmls,
            {
                headers:{
                    'Content-Type': 'text/xml'
                }
            }
        )
       return response
    }
    catch(error){
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário.');
    }
}

export const loginService = async (telefone: string, password: string)  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
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
            

            console.log('saiu')

            return user

    }
    catch(error){
        console.error('Erro ao fazer login:', error);
    }
}
