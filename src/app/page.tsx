'use client'

import Aos from 'aos'
import { useEffect } from 'react'
import CriarEnqueteForm from './components/CriarEnqueteForm'
import EnqueteAtiva from './components/EnqueteAtiva'
import EnquetesEncerradas from './components/EnquetesEncerradas'

export default function Home() {

  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className='flex font-principal font-black text-3xl text-gray-700'>
        AGO 2024 - Adm
      </h1>
      <div className='flex w-full justify-center '>
        <section className='flex flex-col w-1/2 px-14'>
          <CriarEnqueteForm />
          <EnqueteAtiva />
        </section>
        <section className='flex w-1/2'>
          <EnquetesEncerradas />
        </section>
      </div>
    </main>
  )
}
