import axios from "axios"

const API_URL = 'http://localhost:8080'

type NovaEnquete = {
    pergunta: string
    tempo: number
}

type AdicionarResposta = {
    resposta: string
    crm: string
    id_enquete:string
}

async function criarNovaEnquete(data: NovaEnquete) {
    const response = await axios.post(`${API_URL}/enquete`, data)
    return response
}

async function encerrarEnquete() {
    return await axios.put(`${API_URL}/enquete/encerrar`)
}

async function buscarEnqueteAtiva() {
    return await axios.get(`${API_URL}/enquete/ativa`)
}

async function buscarEnquetesEncerradas() {
    return await axios.get(`${API_URL}/enquete/encerradas`)
}

async function adicionarResposta(data: AdicionarResposta) {
    const response = await axios.post(`${API_URL}/resposta`, data)
    return response
}

export const api = {
    criarNovaEnquete,
    encerrarEnquete,
    buscarEnqueteAtiva,
    adicionarResposta,
    buscarEnquetesEncerradas
}
