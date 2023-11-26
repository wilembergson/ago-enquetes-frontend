'use client'
import { api } from '@/api/api-conections'
import { useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'

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
        <ItemPrincipal titulo='Nova enquete' cor='bg-green-500'>
            <form className='flex flex-col p-4 bg-white'
                action={adicionarEnquete}>
                <textarea className='flex mb-4 bg-gray-100 p-2 rounded-md'

                    placeholder='Digite uma nova pergunta'
                    name='pergunta'
                    onChange={(e: any) => handleChange(e)}
                    value={enquete.pergunta}
                    required
                />
                <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                    type="number"
                    placeholder='Duração (em minutos)'
                    name='tempo'
                    onChange={(e: any) => handleChange(e)}
                    value={enquete.tempo}
                    required
                />
                <div>
                    <button className={botaoStyle('bg-green-500')}>
                        Criar
                    </button>
                </div>
            </form>
        </ItemPrincipal>
    )
}