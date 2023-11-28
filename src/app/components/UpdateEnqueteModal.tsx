import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextoEnqueteAtiva";
import { botaoStyle } from "../utils/botao-style";
import Modal from "./modal";
import { api } from "@/api/api-conections";
import alerts from "../utils/alerts";

type Props = {
    isVisible: boolean
    setVisible?: any
}

type UpdateEnquete = {
    pergunta: string;
    tempo: number;
}

export default function UpdateEnqueteModal({ isVisible, setVisible }: Props) {
    const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()

    const [enquete, setEnquete] = useState<UpdateEnquete>({
        pergunta: enqueteAtiva?.pergunta!,
        tempo: enqueteAtiva?.tempo!
    } )

    function handleChange({ target }: any) {
        setEnquete({ ...enquete, [target.name]: target.value })
    }

    async function obterEnqueteAtiva() {
        try {
            const response = await api.buscarEnqueteAtiva()
            setEnquete({
                pergunta: response.data.pergunta,
                tempo: response ? response.data.tempo : ''
            })
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    function confirmarAtualizacao(event:any){
        event.preventDefault()
        alerts.ConfirmarAlert(
            atualizarEnquete,
            'Cofirmar atualização?',
            'As mudanças seram exibidas na votação.'
        )
    }

    async function atualizarEnquete() {
        try {
            const response = await api.atualizarEnquete({
                pergunta: enquete.pergunta!,
                tempo: enquete?.tempo!
            })
            setEnqueteAtiva({
                id: enqueteAtiva?.id!,
                pergunta: enquete.pergunta!,
                tempo: enquete.tempo,
                ativo: enqueteAtiva?.ativo!,
                data_hora: enqueteAtiva?.data_hora!
            })
            setVisible(false)
            alerts.SucessoAlert(response.data.mensagem)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        obterEnqueteAtiva()
    }, [enqueteAtiva])

    return (
        <Modal isVisible={isVisible}>
            <div className="flex flex-col bg-white w-2/5 h-52 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-white text-lg p-2 bg-blue-500">
                    Editar enquete
                </h1>
                <form className='flex flex-col p-4 bg-white'
                    onSubmit={confirmarAtualizacao}>
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
                    <div className="flex">
                    <button className={botaoStyle("bg-blue-500")}>
                            Confirmar
                        </button>
                        <button className={botaoStyle("bg-red-500")}
                            onClick={() => setVisible(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </Modal>
    )
}