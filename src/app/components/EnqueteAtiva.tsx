import { api } from '@/api/api-conections'
import { useEffect } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'


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
        <ItemPrincipal titulo='Enquete em votação' cor='bg-blue-500'>
            {enqueteAtiva ?
                <section className='flex flex-col items-center p-4'>
                    <h3 className='flex font-black text-gray-700'>
                        {enqueteAtiva.pergunta}
                    </h3>
                    <div className='flex w-full mt-4'>
                    <button className={botaoStyle('bg-blue-500')}
                            onClick={() => encerrarEnquete()}>
                            Editar
                        </button>
                        <button className={botaoStyle('bg-yellow-400')}
                            onClick={() => encerrarEnquete()}>
                            Encerrar
                        </button>
                    </div>
                </section>
                : <h1 className='flex justify-center text-gray-500 p-10 text-md'>
                    Sem enquetes ativas no momento
                </h1>}
        </ItemPrincipal>
    )
}
