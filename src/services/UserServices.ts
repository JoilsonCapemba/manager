'use server'

import axios from "axios"
import { XMLParser } from 'fast-xml-parser';

type Userprops = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

const url = 'https://03d1-102-214-36-238.ngrok-free.app/ws/users.wsdl'

export const createUser = async (user: Userprops) => {
    console.log('entrou servico')
    try {
        const xmls = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
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
            </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        // Parser para converter a resposta XML em JSON, se necessário
        const parser = new XMLParser();
        const jsonRes = parser.parse(response.data);
        console.log('Resposta da criação de usuário:', jsonRes);

        return jsonRes;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário.');
    }
}

export const loginService = async (telefone: string, password: string) => {
    console.log('entrou login')
    try {
        const xmls = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                <soapenv:Header/>
                <soapenv:Body>
                    <int:loginRequest>
                        <int:telephone>${telefone}</int:telephone>
                        <int:password>${password}</int:password>
                    </int:loginRequest>
                </soapenv:Body>
            </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        const parser = new XMLParser();
        const jsonRes = parser.parse(response.data);
        const loginRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:loginResponse'];

        const user = {
            id: loginRes['ns2:id'],
            name: loginRes['ns2:name'],
            email: loginRes['ns2:email'],
            telephone: loginRes['ns2:telephone'],
            saldo: loginRes['ns2:saldo'],
            token: loginRes['ns2:token'],
            type: loginRes['ns2:type']
        };

        console.log('user servico',user);

        // Exemplo de lógica de retorno alternativo
        if (user.type === 0) {
            return {
                id: "fake",
                name: "fake",
                email: "fake",
                telephone: "fake",
                saldo: 2,
                token: "fake",
                type: 0
            };
        }

        return user;

    } catch (error) {
        console.error('Erro ao fazer login:', error);

        return {
            id: "fake",
            name: "fake",
            email: "fake",
            telephone: "fake",
            saldo: 2,
            token: "fake",
            type: 0
        };
    }
}
