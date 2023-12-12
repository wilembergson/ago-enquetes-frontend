'use client'
import { api } from '@/api/api-conections'
import { useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'
import alerts from '../utils/alerts'

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

    function confirmarNovaEnquete() {
        alerts.ConfirmarAlert(
            adicionarEnquete,
            'Confirmar nova enquete?',
            'Ao confirmar, esta enquete será exibida para votação.'
        )
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
            alerts.SucessoAlert(novaEnquete.data.mensagem)
            const response = await api.buscarEnqueteAtiva()
            setEnqueteAtiva(response.data)
        } catch (error: any) {
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    return (
        <ItemPrincipal titulo='Nova enquete' cor='bg-green-500'>
            <form className='flex flex-col p-4 bg-white rounded-lg'
                action={confirmarNovaEnquete}>
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