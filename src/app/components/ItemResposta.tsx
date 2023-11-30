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
    const {conteudo} = resposta
    return(
        <section className="flex bg-blue-100 rounded-lg p-2 my-2">
            <div>
                <h1>Voto</h1>
                <h2>{conteudo}</h2>
            </div>
        </section>
    )
}