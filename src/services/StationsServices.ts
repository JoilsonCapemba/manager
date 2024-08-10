'use server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

// URL do endpoint SOAP
const endpointUrl = 'http://192.168.43.142:8080/ws';

// Função para buscar detalhes de uma estação
export const getStation = async (stationName: string) => {
  console.log('Fetching station details');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:GetStationRequest>
                        <int:stationName>${stationName}</int:stationName>
                      </int:GetStationRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });

    console.log('SOAP Response:', response.data);

    const jsonRes = parser.parse(response.data);
    console.log('Parsed JSON Response:', JSON.stringify(jsonRes, null, 2));

    const stationRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:GetStationResponse']['ns2:station'];

    if (!stationRes) {
      throw new Error('Station data not found in response');
    }

    // Inclui as docas, se existirem
    const docks = stationRes['ns2:dockItem'] ? stationRes['ns2:dockItem'].map((dock: any) => ({
      idDock: parseInt(dock['ns2:idDock']),
      reference: dock['ns2:reference'],
      state: parseInt(dock['ns2:state']),
      info: dock['ns2:info'],
    })) : [];

    const stationDetails = {
      id: parseInt(stationRes['ns2:id']),
      name: stationRes['ns2:name'],
      latitude: parseFloat(stationRes['ns2:latitude']),
      longitude: parseFloat(stationRes['ns2:longitude']),
      capacity: parseInt(stationRes['ns2:capacity']),
      availableBikes: parseInt(stationRes['ns2:availableBikes']),
      availableDocks: parseInt(stationRes['ns2:availableDocks']),
      deliveryBonus: parseInt(stationRes['ns2:deliveryBonus']),
      docks: docks
    };

    console.log('Parsed Station Details with Docks:', stationDetails);
    return stationDetails;
  } catch (error) {
    console.error('Erro ao buscar estação:', error);
    return null; // Retorna null ou um valor padrão caso ocorra erro
  }
};

// Função para adicionar um dock
export const addDock = async (stationId: number, dock: any) => {
  console.log('Adding dock to station');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:AddDockRequest>
                        <int:stationId>${stationId}</int:stationId>
                        <int:dock>
                          <int:idDock>?</int:idDock>
                          <int:reference>${dock.reference}</int:reference>
                          <int:state>${dock.state}</int:state>
                          <int:info>${dock.info}</int:info>
                        </int:dock>
                      </int:AddDockRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser();
    const jsonRes = parser.parse(response.data);
    const success = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:AddDockResponse']['ns2:success'] === 'true';

    console.log('Dock added successfully:', success);
    return success;
  } catch (error) {
    console.error('Erro ao adicionar dock:', error);
  }
};

// Função para alterar o estado de um dock ao subir uma bicicleta
export const alterDockStateInUpBike = async (stationId: number, dockId: number, state: number) => {
  console.log('Altering dock state in up bike');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:AlterStateDockInUpBikeRequest>
                        <int:stationId>${stationId}</int:stationId>
                        <int:dockId>${dockId}</int:dockId>
                        <int:state>${state}</int:state>
                      </int:AlterStateDockInUpBikeRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser();
    const jsonRes = parser.parse(response.data);
    const success = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:AlterStateDockInUpBikeResponse']['ns2:success'] === 'true';

    console.log('Dock state altered successfully:', success);
    return success;
  } catch (error) {
    console.error('Erro ao alterar estado do dock:', error);
  }
};

// Função para deletar um dock
export const deleteDock = async (stationId: number, dockId: number) => {
  console.log('Deleting dock from station');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:DeleteDockRequest>
                        <int:stationId>${stationId}</int:stationId>
                        <int:dockId>${dockId}</int:dockId>
                      </int:DeleteDockRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser();
    const jsonRes = parser.parse(response.data);
    const success = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:DeleteDockResponse']['ns2:success'] === 'true';

    console.log('Dock deleted successfully:', success);
    return success;
  } catch (error) {
    console.error('Erro ao deletar dock:', error);
  }
};
