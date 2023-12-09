import { useState } from "react"
import ResultadoEnqueteModal from "./ResultadoEnqueteModal"

type Props = {
    id: string
    pergunta: string
    data_hora: number[]
}

export default function ItemEnqueteEncerrada({ id, pergunta, data_hora }: Props) {
    const [showModal, setShowModal] = useState(false)
    const data_e_hora  = `${data_hora[2] < 10 ? '0' : ''}${data_hora[2]}/${data_hora[1]}/${data_hora[0]} às ${data_hora[3] < 10 ? '0' : ''}${data_hora[3]}:${data_hora[4] < 10 ? '0' : ''}${data_hora[4]}h`
    
    return (
        <>
            <section className="flex flex-col shadow-sm m-2 p-2 bg-[#E3F4F9] cursor-pointer
                            hover:opacity-70 transition duration-300 rounded-md"
                onClick={() => setShowModal(true)}>
                <h2 className="flex font-black text-gray-700">
                    {pergunta}
                </h2>
                <h3 className="flex text-sm text-gray-600 mt-2 justify-end">
                    Iniciada em: {data_e_hora}
                </h3>
            </section>
            <ResultadoEnqueteModal
                isVisible={showModal}
                setVisible={() => setShowModal(false)}
                enquete={{ id, pergunta, data_e_hora }} />
        </>
    )
}