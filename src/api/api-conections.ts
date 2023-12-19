import axios from "axios"

const API_URL = 'http://localhost:8080'

type NovaEnquete = {
    pergunta: string
    tempo: number
}

type AdicionarResposta = {
    resposta: string
    crm: string
    id_enquete: string
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


async function atualizarEnquete(tempo: number) {
    const response = await axios.put(`${API_URL}/enquete/atualizar/${tempo}`)
    return response
}

async function adicionarResposta(data: AdicionarResposta) {
    const response = await axios.post(`${API_URL}/voto`, data)
    return response
}

async function listarRespostas(enquete_id: number) {
    return await axios.get(`${API_URL}/voto/listar-por-enquete/${enquete_id}`)
}

async function atualizarResultadoStatus(id_enquete: number, status: number) {
    return await axios.put(`${API_URL}/enquete/atualizar-resultado-status/${id_enquete}`,
        {
            status
        }
    )
}

export const api = {
    criarNovaEnquete,
    encerrarEnquete,
    buscarEnqueteAtiva,
    adicionarResposta,
    atualizarEnquete,
    buscarEnquetesEncerradas,
    listarRespostas,
    atualizarResultadoStatus
}
