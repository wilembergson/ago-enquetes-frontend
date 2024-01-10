'useClient'
import { api } from '@/api/api-conections'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'
import alerts from '../utils/alerts'
import UpdateEnqueteModal from './UpdateEnqueteModal'
import Countdown, { zeroPad } from 'react-countdown'

export default function EnqueteAtiva() {

    const [enquete, setEnquete] = useState<any>(null)
    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()
    const [showUpdateEnquete, setShowUpdateEnquete] = useState(false)
    const [dataCronometro, setDataCronometro] = useState<Date>()
    const [tempo, setTempo] = useState<string>('')
    const [key, setKey] = useState(0);

    const handleChange = useCallback((e: any) => {
        e.preventDefault();
        setTempo(e.target.value);
    }, [])

    const countdownComponent = useMemo(() => (
        <Countdown
            key={key}
            date={dataCronometro}
            intervalDelay={0}
            precision={2}
            renderer={({ minutes, seconds }) => (
                <span className='flex font-black text-2xl text-blue-600 mt-2'>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            )}
        />
    ), [dataCronometro, key]);



    async function obterEnqueteAtiva() {
        try {
            const res = await api.buscarEnqueteAtiva()
            setEnquete(res.data)
            await buscarCountdown(res.data.data_cronometro)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    async function buscarCountdown(data_cronometro: number[]) {
            const nova_data = new Date()
            nova_data.setHours(data_cronometro[3], data_cronometro[4], data_cronometro[5])
            setDataCronometro(nova_data)
    }

    function confirmarEncerramentoEnquete() {
        alerts.ConfirmarAlert(
            encerrarEnquete,
            'Encerrar enquete?',
            'Ao confirmar, não será mais possível votar.'
        )
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

    function confirmarAtualizacao(event: any) {
        event.preventDefault()
        alerts.ConfirmarAlert(
            atualizarEnquete,
            'Estender o tempo da enquete?',
            'As mudanças seram exibidas na votação.'
        )
    }

    async function atualizarEnquete() {
        try {
            const response = await api.atualizarEnquete(parseFloat(tempo!))
            alerts.SucessoAlert(response.data.mensagem)
            await obterEnqueteAtiva()
            setTempo('')
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        obterEnqueteAtiva()
    }, [enqueteAtiva])

    useEffect(() => {
        // Incrementando a chave para forçar a recriação do Countdown
        setKey((prevKey) => prevKey + 1);
    }, [dataCronometro]);

    return (
        <>
            <ItemPrincipal titulo='Enquete em votação' cor='bg-blue-500'>
                {enquete ?
                    <section className='flex flex-col items-center p-4'>
                        <h3 className='flex font-black text-lg text-gray-700'>
                            {enquete.pergunta}
                        </h3>

                        <form className='flex items-center mt-8 w-1/2 justify-between'
                            onSubmit={confirmarAtualizacao}>
                            {countdownComponent}
                            <div className='flex justify-between'>
                                <input className='flex w-20 bg-gray-200 p-2 rounded-md'
                                    type="number"
                                    placeholder='tempo'
                                    name='tempo'
                                    onChange={(e: any) => handleChange(e)}
                                    value={tempo!}
                                    required
                                />
                                <button className={botaoStyle('bg-blue-500 h-auto items-center font-black text-3xl px-4')}>
                                    +
                                </button>
                            </div>
                        </form>
                        <div className='flex w-full mt-4'>
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
            <UpdateEnqueteModal isVisible={showUpdateEnquete} setVisible={() => setShowUpdateEnquete(false)} />
        </>
    )
}
