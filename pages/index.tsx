import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../src/components/Header'
import { Home } from '../src/components/Home'

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>Edson Lucas | FrontEnd dev</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-gradientRadial from-comment via-current-line to-background">
        <Header/>
        <Home/>
      </div>
    </>
  )
}

export default App;
