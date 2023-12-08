type Props = {
    resposta: Resposta
}
type Resposta = {
    id:string
    conteudo:string
    crm:string
    nome:string
    data_hora:number[]
}

export default function ItemResposta({resposta}:Props){
    const {conteudo, crm, nome, data_hora} = resposta
    const hora  = `${data_hora[3] < 10 ? '0' : ''}${data_hora[3]}:${data_hora[4] < 10 ? '0' : ''}${data_hora[4]}h`

    return(
        <section className="flex bg-blue-100 rounded-lg p-2 my-2 justify-between">
            <div className="flex flex-col mx-2">
                <h1 className="font-black">Voto</h1>
                <h2>{conteudo}</h2>
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