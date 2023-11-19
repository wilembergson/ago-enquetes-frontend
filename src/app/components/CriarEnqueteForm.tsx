'use client'
import { api } from '@/api/api-conections'
import { useState } from 'react'

type NovaEnquete = {
    pergunta: string
    tempo_segundos: string
}

export default function CriarEnqueteForm() {
    const [enquete, setEnquete] = useState<NovaEnquete>({
        pergunta: '',
        tempo_segundos: ''
    })

    function handleChange({ target }: any) {
        setEnquete({ ...enquete, [target.name]: target.value })
    }

    async function adicionarEnquete() {
        try {
            await api.criarNovaEnquete(enquete)
            setEnquete({
                pergunta: '',
                tempo_segundos: ''
            })
        } catch (error: any) {
            alert(error)
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
                placeholder='Duração (em segundos)'
                name='tempo_segundos'
                onChange={(e: any) => handleChange(e)}
                value={enquete.tempo_segundos}
                required
            />
            <button>Criar</button>
        </form>
    )
}