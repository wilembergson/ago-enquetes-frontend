import { useEffect, useState } from "react"

type Props = {
    voto: Voto
}
type Voto = {
    id: string
    resposta: string
    crm: string
    nome: string
    data_hora: number[]
}

export default function ItemResposta({ voto }: Props) {
    const { resposta, crm, nome, data_hora } = voto
    const [background, setBackground] = useState('')
    const hora = `${data_hora[3] < 10 ? '0' : ''}${data_hora[3]}:${data_hora[4] < 10 ? '0' : ''}${data_hora[4]}h`

    useEffect(() => {
        if(resposta === 'APROVAR'){
            setBackground('bg-green-400')
        }else if(resposta === 'REPROVAR'){
            setBackground('bg-red-400')
        }else if(resposta === 'ABSTER'){
            setBackground('bg-yellow-300')
        }
    },[])

    return (
        <section className={`flex rounded-lg p-2 my-2 justify-between ${background}`}>
            <div className="flex flex-col mx-2">
                <h1 className="font-black">Voto</h1>
                <h2>{resposta}</h2>
            </div>
            <div className="flex flex-col mx-2">
                <h1 className="font-black">CRM</h1>
                <h2>{crm}</h2>
            </div>
            <div className="flex flex-col mx-2">
                <h1 className="font-black">Nome</h1>
                <h2>{nome}</h2>
            </div>
            <div className="flex flex-col mx-2">
                <h1 className="font-black">Hora</h1>
                <h2>{hora}</h2>
            </div>
        </section>
    )
}