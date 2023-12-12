'useClient'
import { api } from '@/api/api-conections'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGlobalContext } from '../context/ContextoEnqueteAtiva'
import ItemPrincipal from './ItemPrincipal'
import { botaoStyle } from '../utils/botao-style'
import alerts from '../utils/alerts'
import UpdateEnqueteModal from './UpdateEnqueteModal'
import Countdown, { zeroPad } from 'react-countdown'
import { randomUUID } from 'crypto'


export default function EnqueteAtiva() {

    const [enquete, setEnquete] = useState<any>(null)
    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()
    const [showUpdateEnquete, setShowUpdateEnquete] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [tempo, setTempo] = useState<string>('')

    const handleChange = useCallback((e: any) => {
        e.preventDefault();
        setTempo(e.target.value);
    }, [])

    const countdownComponent = useMemo(() => (
        <Countdown
            date={Date.now() + countdown}
            intervalDelay={0}
            precision={2}
            renderer={({ minutes, seconds }) => (
                <span className='flex font-black text-2xl text-blue-600 mt-2'>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            )}
        />
    ), [countdown]);



    async function obterEnqueteAtiva() {
        try {
            const response = await api.buscarEnqueteAtiva()
            setEnquete(response.data)
            const tempo = localStorage.getItem('cronometro')
            if (response.data) {
                setCountdown(response.data.tempo * 60000)
                localStorage.setItem('cronometro', (response.data.tempo * 60000).toString())
            }
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
            'Cofirmar atualização?',
            'As mudanças seram exibidas na votação.'
        )
    }

    async function atualizarEnquete() {
        try {
            const response = await api.atualizarEnquete(parseFloat(tempo!))
            /*setEnqueteAtiva({
                id: enqueteAtiva?.id!,
                pergunta: enqueteAtiva!.pergunta!,
                tempo: enquete.tempo,
                ativo: enqueteAtiva?.ativo!,
                data_hora: enqueteAtiva?.data_hora!
            })*/
            alerts.SucessoAlert(response.data.mensagem)
            await obterEnqueteAtiva()
            setTempo('')
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        const intervalo = setTimeout(() => {
            const novoTempo = parseFloat(localStorage.getItem('cronometro')!) - 1000
            localStorage.clear()
            localStorage.setItem('cronometro', novoTempo.toString())
        }, 1000)
        return () => clearInterval(intervalo)
    }, [])

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

                        <form className='flex items-center'
                            onSubmit={confirmarAtualizacao}>
                            {countdownComponent}
                            <input className='flex ml-10 mr-2 w-20 bg-gray-100 p-2 rounded-md'
                                type="number"
                                placeholder='tempo'
                                name='tempo'
                                onChange={(e: any) => handleChange(e)}
                                value={tempo!}
                                required
                            />
                            <button className={botaoStyle('bg-blue-500 h-auto items-center font-black text-3xl px-4 py--2')}>
                                +
                            </button>
                        </form>
                        <div className='flex w-full mt-4'>
                            {/*<button className={botaoStyle('bg-blue-500')}
                                onClick={() => setShowUpdateEnquete(true)}>
                                Editar
                </button>*/}
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
