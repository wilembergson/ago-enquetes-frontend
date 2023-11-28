'useClient'
import { api } from '@/api/api-conections'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'
import alerts from '../utils/alerts'
import UpdateEnqueteModal from './UpdateEnqueteModal'


export default function EnqueteAtiva() {

    const [enquete, setEnquete] = useState<any>(null)
    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()
    const [showUpdateEnquete, setShowUpdateEnquete] = useState(false)

    async function obterEnqueteAtiva() {
        try {
            const response = await api.buscarEnqueteAtiva()
            setEnquete(response.data)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    function confirmarEncerramentoEnquete() {
        alerts.ConfirmarAlert(
            encerrarEnquete,
            'Encerrar enquete?',
            'Ao confirmar, não será mais possível votar.'
        )
    }
    async function teste() {
        alert("testando")
    }
    async function encerrarEnquete() {
        try {
            const response = await api.encerrarEnquete()
            setEnquete(null)
            setEnqueteAtiva(null)
            alerts.SucessoAlert(response.data.mensagem)
        } catch (error: any) {
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        obterEnqueteAtiva()
    }, [enqueteAtiva])

    return (
        <>
            <ItemPrincipal titulo='Enquete em votação' cor='bg-blue-500'>
                {enquete ?
                    <section className='flex flex-col items-center p-4'>
                        <h3 className='flex font-black text-lg text-gray-700'>
                            {enquete.pergunta}
                        </h3>
                        <div className='flex w-full mt-4'>
                            <button className={botaoStyle('bg-blue-500')}
                                onClick={() => setShowUpdateEnquete(true)}>
                                Editar
                            </button>
                            <button className={botaoStyle('bg-yellow-400')}
                                onClick={confirmarEncerramentoEnquete}>
                                Encerrar
                            </button>
                        </div>
                    </section>
                    : <h1 className='flex justify-center text-gray-500 p-10 text-lg'>
                        Sem enquetes ativas no momento
                    </h1>}
            </ItemPrincipal>
            <UpdateEnqueteModal isVisible={showUpdateEnquete} setVisible={() => setShowUpdateEnquete(false)}/>
        </>
    )
}
