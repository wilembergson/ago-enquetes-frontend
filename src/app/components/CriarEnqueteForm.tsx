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
        <div className='flex font-principal flex-col mt-10 rounded-xl shadow-lg'>
            <h1 className='flex font-black text-white text-lg bg-green-500 p-2'>
                Nova enquete
            </h1>
            <form className='flex flex-col mt-4 bg-white'
            action={adicionarEnquete}>
            <textarea className='flex m-2 bg-gray-100 p-2 rounded-md'
                
                placeholder='Digite uma nova pergunta'
                name='pergunta'
                onChange={(e: any) => handleChange(e)}
                value={enquete.pergunta}
                required
            />
            <input className='flex m-2 bg-gray-100 p-2 rounded-md'
                type="number"
                placeholder='Duração (em minutos)'
                name='tempo'
                onChange={(e: any) => handleChange(e)}
                value={enquete.tempo}
                required
            />
            <button className='flex bg-green-500 text-white justify-center m-4 p-2 rounded-lg hover:opacity-70 transition duration-500'>
                Criar
            </button>
        </form>
        </div>
    )
}