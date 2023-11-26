'use client'
import CriarEnqueteForm from './components/CriarEnqueteForm'
import EnqueteAtiva from './components/EnqueteAtiva'
import EnquetesEncerradas from './components/EnquetesEncerradas'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className='flex font-principal text-3xl'>
        AGO 2024 - Adm
      </h1>
      <div className='flex flex-col'>
        <section>
          <CriarEnqueteForm />
          <EnqueteAtiva />
        </section>
        {/*<EnquetesEncerradas/>*/}
      </div>
    </main>
  )
}
