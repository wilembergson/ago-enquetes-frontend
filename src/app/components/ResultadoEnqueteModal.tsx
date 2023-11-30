import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextoEnqueteAtiva";
import { botaoStyle } from "../utils/botao-style";
import Modal from "./modal";
import { api } from "@/api/api-conections";
import alerts from "../utils/alerts";
import ItemResposta from "./ItemResposta";

type Props = {
    isVisible: boolean
    setVisible?: any,
    enquete: Enquete
}

type Enquete = {
    id: string
    pergunta: string
    data_e_hora: string
}

type Resposta = {
    id: string
    conteudo: string
    crm: string
    nome: string
    data_hora: number[]
}
export default function ResultadoEnqueteModal({ isVisible, setVisible, enquete }: Props) {
    const [respostas, setRespostas] = useState<Resposta[]>()

    /*function handleChange({ target }: any) {
        setEnquete({ ...enquete, [target.name]: target.value })
    }*/

    async function obterRespostas() {
        try {
            const response = await api.listarRespostas(enquete.id)
            setRespostas(response.data)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        obterRespostas()
    }, [])

    return (
        <Modal isVisible={isVisible}>
            <div className="flex flex-col bg-white text-gray-700 w-4/5 h-5/6 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-white text-lg p-2 bg-red-500">
                    Resultado da enquete
                </h1>
                <div>
                    <section className="flex flex-col w-1/2 p-4">
                        <div className="flex flex-col">
                            <h2 className=" font-black">Pergunta:</h2>
                            <h1 className="flex text-xl">
                                {enquete.pergunta}
                            </h1>
                        </div>
                        <div className="flex flex-col mt-4">
                            <h2 className=" font-black">Data e hora:</h2>
                            <h1 className="flex text-xl">
                                {enquete.data_e_hora}
                            </h1>
                        </div>
                        <div className="flex flex-col mt-4 h-72 overflow-y-scroll pr-2">
                            <h2 className=" font-black">Respostas:</h2>
                            {respostas?.map(item => <ItemResposta resposta={item} />)}
                        </div>
                    </section>
                </div>
                <div className="flex w-full justify-center">
                    <button className={botaoStyle("bg-blue-500")}
                        onClick={() => setVisible(false)}>
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    )
}