import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextoEnqueteAtiva";
import { botaoStyle } from "../utils/botao-style";
import Modal from "./modal";
import { api } from "@/api/api-conections";
import alerts from "../utils/alerts";
import ItemResposta from "./ItemResposta";
import CircleChart from "./circle-chart";

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
    const [aprovar, setAprovar] = useState<number>()
    const [reprovar, setReprovar] = useState<number>()
    const [abster, setAbster] = useState<number>()

    /*function handleChange({ target }: any) {
        setEnquete({ ...enquete, [target.name]: target.value })
    }*/

    async function obterRespostas() {
        try {
            const response = await api.listarRespostas(enquete.id)
            setRespostas(response.data)
            obterResultados(response.data)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    function obterResultados(votos: any[]) {
        let ap: number = 0
        let rep: number = 0
        let abst: number = 0
        votos.forEach(item => {
            if (item.conteudo === 'APROVAR') {
                ap += 1
            } else if (item.conteudo === 'REPROVAR') {
                rep += 1
            } else {
                abst += 1
            }
        })
        setAprovar(ap)
        setReprovar(rep)
        setAbster(abst)
    }

    useEffect(() => {
        obterRespostas()
    }, [])

    return (
        <Modal isVisible={isVisible}>
            <div className="flex relative flex-col bg-white text-gray-700 w-4/5 h-5/6 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-white text-lg p-2 bg-red-500">
                    Resultado da enquete
                </h1>
                <div className="flex">
                    <section className="flex flex-col w-1/2 p-4">
                        <div className="flex flex-col">
                            <h2 className=" font-black">Data e hora:</h2>
                            <h1 className="flex text-xl">
                                {enquete.data_e_hora}
                            </h1>
                        </div>
                        <h2 className=" font-black mt-4">Votação:</h2>
                        <div className="flex flex-col h-[360px] overflow-y-scroll pr-2">
                            {respostas?.map(item => <ItemResposta resposta={item} />)}
                        </div>
                    </section>
                    <section className="flex flex-col w-1/2 p-6">
                        <div className="flex flex-col">
                            <h1 className="flex text-xl font-black">
                                {enquete.pergunta}
                            </h1>
                            <section className="flex mt-6 justify-center">
                                {(aprovar! === reprovar!) ? <h1 className="text-gray-500 text-4xl font-black rounded-lg bg-gray-200 p-2">
                                    EMPATE
                                </h1>
                                    : (aprovar! > reprovar!)
                                        ? <h1 className="text-green-500 text-4xl font-black rounded-lg bg-green-200 p-2">
                                            APROVAR
                                        </h1>
                                        : <h1 className="text-red-500 text-4xl font-black rounded-lg bg-red-200 p-2">
                                            REPROVAR
                                        </h1>
                                }
                            </section>
                        </div>
                        <div className="flex mt-10 justify-center">
                            <div className="flex font-black flex-col mr-10">
                                <h1 className="text-green-500 text-lg">APROVAR: {aprovar}</h1>
                                <h1 className="text-red-500 text-lg">REPROVAR: {reprovar}</h1>
                                <h1 className="text-yellow-500 text-lg">ABSTER: {abster}</h1>
                                <h1 className="text-gray-500 text-2xl mt-10">TOTAL: {respostas?.length}</h1>
                            </div>
                            <CircleChart aprovar={aprovar} reprovar={reprovar} abster={abster} />
                        </div>
                    </section>
                </div>
                <div className="absolute bottom-4 w-full flex items-center justify-center">
                    <button className={botaoStyle("bg-blue-500")}
                        onClick={() => setVisible(false)}>
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    )
}