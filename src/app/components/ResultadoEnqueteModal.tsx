import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextoEnqueteAtiva";
import { botaoStyle } from "../utils/botao-style";
import Modal from "./modal";
import { api } from "@/api/api-conections";
import alerts from "../utils/alerts";
import ItemResposta from "./ItemResposta";
import CircleChart from "./circle-chart";
import jsPDF from "jspdf";

type Props = {
    isVisible: boolean
    setVisible?: any
    enquete: Enquete
    atualizarLista: () => any
}

type Enquete = {
    id: number
    pergunta: string
    exibirResultado: number
    data_e_hora: string
}

type Voto = {
    id: string
    resposta: string
    crm: string
    nome: string
    exibirResultado: number
    data_hora: number[]
}



export default function ResultadoEnqueteModal({ isVisible, setVisible, enquete, atualizarLista }: Props) {
    const [respostas, setRespostas] = useState<Voto[]>()
    const [aprovar, setAprovar] = useState<number>()
    const [reprovar, setReprovar] = useState<number>()
    const [abster, setAbster] = useState<number>()

    async function obterRespostas() {
        try {
            const response = await api.listarRespostas(enquete.id)
            console.log(response.data)
            setExibirResultado(enquete.exibirResultado)
            if (enquete.exibirResultado === 0) {
                setAtivo(false)
            } else {
                setAtivo(true)
            }
            setRespostas(response.data)
            obterResultados(response.data)
        } catch (error: any) {
            alert(error)
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    async function atualizarResultadoStatus(status: number, ativo: boolean) {
        try {
            const res = await api.atualizarResultadoStatus(enquete.id, status)
            console.log(res.data)
            setAtivo(ativo)
        } catch (error: any) {
            alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    function obterResultados(votos: any[]) {
        let ap: number = 0
        let rep: number = 0
        let abst: number = 0
        votos.forEach(item => {
            if (item.resposta === 'APROVAR') {
                ap += 1
            } else if (item.resposta === 'REPROVAR') {
                rep += 1
            } else {
                abst += 1
            }
        })
        setAprovar(ap)
        setReprovar(rep)
        setAbster(abst)
    }

    const [ativo, setAtivo] = useState(true);
    const [exibirResultado, setExibirResultado] = useState(0)

    const handleToggle = async () => {
        if (ativo) {
            await atualizarResultadoStatus(0, false)
        } else {
            await atualizarResultadoStatus(1, true)
        }
        atualizarLista()
    }

    useEffect(() => {
        obterRespostas()
    }, [enquete.exibirResultado])

    const relatorio = (lista:any[]) => {
        const pdf = new jsPDF();
      
        // Título do PDF
        pdf.text('Relatório', 10, 10);
      
        // Loop através do array de objetos e adiciona as informações ao PDF
        lista.forEach((item, index) => {
          const yPos = 20 + index * 10;
          pdf.text(`${item.resposta}: ${item.nome}: ${item.crm}: ${item.data_hora}`, 10, yPos);
        });
      
        // Salva o PDF ou exibe no navegador
        pdf.save('relatorio.pdf');
      };

    function gerarPDF(){
        relatorio(respostas!)
    }

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
                        <div>
                            <h2 className=" font-black mt-4">Votação:</h2>
                            <button onClick={gerarPDF} className="cursor-pointer">
                                PDF
                            </button>
                        </div>
                        <div className="flex flex-col h-[360px] overflow-y-scroll pr-2">
                            {respostas?.map(item => <ItemResposta voto={item} />)}
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

                        <label className="relative inline-flex items-center cursor-pointer mt-6">
                            <input type="checkbox" checked={ativo} onChange={handleToggle} value={exibirResultado} className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Exibir resultado na transmisão</span>
                        </label>
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