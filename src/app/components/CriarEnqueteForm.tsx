'use client'
import { api } from '@/api/api-conections'
import { useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'

type NovaEnquete = {
    pergunta: string
    tempo: string
}

export default function CriarEnqueteForm() {
    const { setEnqueteAtiva } = useGlobalContext()
    const [enquete, setEnquete] = useState<NovaEnquete>({
        pergunta: '',
        tempo: ''
    })

    function handleChange({ target }: any) {
        setEnquete({ ...enquete, [target.name]: target.value })
    }

    async function adicionarEnquete() {
        try {
            const novaEnquete = await api.criarNovaEnquete({
                pergunta: enquete.pergunta,
                tempo: parseInt(enquete.tempo)
            })
            setEnquete({
                pergunta: '',
                tempo: ''
            })
            alert(novaEnquete.data.mensagem)
            const response = await api.buscarEnqueteAtiva()
            setEnqueteAtiva(response.data)
        } catch (error: any) {
            alert(error.response.data.mensagem)
            console.log(error)
        }
    }

    return (
        <form className='flex flex-col mt-4'
            action={adicionarEnquete}>
            <input className='flex m-2'
                type="text"
                placeholder='Digite uma nova pergunta'
                name='pergunta'
                onChange={(e: any) => handleChange(e)}
                value={enquete.pergunta}
                required
            />
            <input className='flex m-2'
                type="number"
                placeholder='Duração (em minutos)'
                name='tempo'
                onChange={(e: any) => handleChange(e)}
                value={enquete.tempo}
                required
            />
            <button>Criar</button>
        </form>
    )
}