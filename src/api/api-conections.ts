import axios from "axios"

const API_URL = 'http://localhost:5000'

type NovaEnquete = {
    pergunta: string
    tempo_segundos: string
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

async function encerrarEnquete(id: string) {
    return await axios.put(`${API_URL}/enquete/${id}`)
}

async function buscarEnqueteAativa() {
    return await axios.get(`${API_URL}/enquete/ativa`)
}

async function adicionarResposta(data: AdicionarResposta) {
    const response = await axios.post(`${API_URL}/resposta`, data)
    return response
}

export const api = {
    criarNovaEnquete,
    encerrarEnquete,
    buscarEnqueteAativa,
    adicionarResposta
}
