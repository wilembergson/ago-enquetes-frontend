import { useState, useEffect } from 'react'
import { api } from "@/api/api-conections"
import ItemPrincipal from './ItemPrincipal'
import ItemEnqueteEncerrada from './ItemEnqueteEncerrada'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'

export default function EnquetesEncerradas() {
    const [enquetes, setEnquetes] = useState<Enquete[]>()
    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()

    async function listarEnquetes() {
        try {
            const lista = await api.buscarEnquetesEncerradas()
            setEnquetes(lista.data)
        } catch (error: any) {
            alert(error.response.data.mensagem)
            console.log(error)
        }
    }

    useEffect(() => {
        listarEnquetes()
    }, [enqueteAtiva])

    return (
        <ItemPrincipal titulo={`Enquetes encerradas (${enquetes?.length})`} cor='bg-red-500'>
            {enquetes?.map(item =>
                <ItemEnqueteEncerrada
                    key={item.id}
                    id={item.id}
                    pergunta={item.pergunta}
                    data_hora={item.data_hora}
                />)}
        </ItemPrincipal>
    )
}

type Enquete = {
    id: string
    pergunta: string
    tempo: number
    ativo: number
    data_hora: number[]
}