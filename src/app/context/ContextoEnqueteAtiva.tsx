'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

type EnqueteAtiva = {
    id: string
    pergunta: string
    tempo: number
    ativo: number
    data_hora: number[]
}

interface ContextProps {
    /*userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    userName: string
    setUserName: Dispatch<SetStateAction<string>>*/
    enqueteAtiva: EnqueteAtiva | null
    setEnqueteAtiva: Dispatch<SetStateAction<EnqueteAtiva | null>>
}

const GlobalContext = createContext<ContextProps>({
    /*userId: '',
    setUserId: (): string => '',
    userName: '',
    setUserName: (): string => '',*/
    enqueteAtiva: null,
    setEnqueteAtiva: (): EnqueteAtiva | null => null 
})

export const GlobalContextProvider = ({ children }: any) => {
    /*const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')*/
    const [enqueteAtiva, setEnqueteAtiva] = useState<EnqueteAtiva | null>(null)

    return (
        <GlobalContext.Provider value={{ enqueteAtiva, setEnqueteAtiva }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)