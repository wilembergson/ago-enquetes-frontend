import { ReactNode } from "react"

type Props = {
    titulo:string
    cor: string
    children: ReactNode
}

export default function ItemPrincipal({titulo, cor, children}: Props){
    const tituloStyle = `flex font-black text-white text-lg p-2 rounded-t-lg ${cor}`
    return(
        <div className='flex font-principal flex-col bg-white mt-10 rounded-lg shadow-lg w-full'>
            <h1 className={tituloStyle}>
                {titulo}
            </h1>
            {children}
        </div>
    )
}