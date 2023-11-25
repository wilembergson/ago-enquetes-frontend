import {useState, useEffect} from 'react'
import { api } from "@/api/api-conections"

export default function EnquetesEncerradas(){
    const [enquetes, setEnquetes] = useState<Enquete[]>()

    async function listarEnquetes(){
        try {
            const lista = await api.buscarEnquetesEncerradas()
            console.log(lista)
            setEnquetes(lista.data)
        } catch (error: any) {
            alert(error.response.data.mensagem)
            console.log(error)
        }
    }

    useEffect(() => {
        
            listarEnquetes()
        
    },[enquetes])

    return(
        <div className='flex flex-col mt-10'>
            <h2>Enquetes encerradas</h2>
            {enquetes?.map(item => 
            <section className='flex bg-red-200 my-2 cursor-pointer'>
                {item.pergunta}
            </section>)}
        </div>
    )
}

type Enquete = {
    id: string
    pergunta: string
    tempo: number
    ativo: number
    data_hora: number[]
}