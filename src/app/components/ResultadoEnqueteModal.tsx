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

    function obterResultados(votos:any[]) {
        let ap:number = 0
        let rep:number = 0
        let abst:number = 0
        votos.forEach(item => {
            if(item.conteudo === 'APROVADO'){
                ap += 1
            } else if(item.conteudo === 'REPROVAR'){
                rep += 1
            }else {
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
            <div className="flex flex-col bg-white text-gray-700 w-4/5 h-5/6 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-white text-lg p-2 bg-red-500">
                    Resultado da enquete
                </h1>
                <div className="flex">
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
                    <section className="flex w-1/2 justify-center py-20">
                        <div className="flex font-black flex-col mr-10">
                            <h1 className="text-green-500 text-xl">APROVADO: {aprovar}</h1>
                            <h1 className="text-red-500 text-xl">REPROVADO: {reprovar}</h1>
                            <h1 className="text-yellow-500 text-xl">ABSTER: {abster}</h1>
                            <h1 className="text-gray-500 text-3xl mt-10">TOTAL: {respostas?.length}</h1>
                        </div>
                        <CircleChart aprovados={aprovar} reprovados={reprovar} abstencoes={abster}/>
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