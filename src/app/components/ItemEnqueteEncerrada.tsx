type Props = {
    id: string
    pergunta: string
    data_hora: number[]
}

export default function ItemEnqueteEncerrada({id, pergunta, data_hora}:Props){
    return(
        <section className="flex flex-col shadow-sm m-2 p-2 bg-[#E3F4F9] cursor-pointer
                            hover:opacity-70 transition duration-300 rounded-md">
            <h2 className="flex font-black text-gray-700">
                {pergunta}
            </h2>
            <h3 className="flex text-sm text-gray-600">
                Iniciada em: {`${data_hora[2]}/${data_hora[1]}/${data_hora[0]} às ${data_hora[3]}:${data_hora[4]}h`}
            </h3>
        </section>
    )
}