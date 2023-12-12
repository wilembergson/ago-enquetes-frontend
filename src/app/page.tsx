'use client'

import Aos from 'aos'
import { useEffect } from 'react'
import CriarEnqueteForm from './components/CriarEnqueteForm'
import EnqueteAtiva from './components/EnqueteAtiva'
import EnquetesEncerradas from './components/EnquetesEncerradas'
import Header from './components/Header'

export default function Home() {

  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  return (
    <main className="flex min-h-screen bg-[#F7F7F7] flex-col items-center pb-8">
      <Header/>
      <div className='flex w-full justify-center pr-10'>
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
