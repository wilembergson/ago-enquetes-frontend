import { api } from '@/api/api-conections'
import { useEffect } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'


export default function EnqueteAtiva() {

    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()

    async function obterEnqueteAtiva() {
        try {
            const response = await api.buscarEnqueteAtiva()
            setEnqueteAtiva(response.data)
        } catch (error: any) {
            alert(error)
            console.log(error)
        }
    }

    async function encerrarEnquete() {
        try {
            const response = await api.encerrarEnquete()
            alert(response.data.mensagem)
        } catch (error: any) {
            alert(error)
            console.log(error)
        }
    }

    useEffect(() => {
        obterEnqueteAtiva()
    }, [enqueteAtiva])

    return (
        <div className='flex flex-col bg-lime-300 mt-10'>
            <h2>Enquete em votação</h2>
            {enqueteAtiva ?
                <section className='flex flex-col items-center'>
                    <h3 className='flex font-black m-2'>{enqueteAtiva.pergunta}</h3>
                    <button className='flex bg-blue-200 w-auto justify-center'
                        onClick={() => encerrarEnquete()}>
                        Encerrar
                    </button>
                </section>
                : <h1 className='flex bg-blue-200 justify-center'>
                    Sem enquetes ativas no momento
                </h1>}
        </div>
    )
}
