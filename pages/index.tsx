import Head from 'next/head'
import { Header } from '../src/components/Header'
import { Home } from '../src/components/Home'
import { loadData } from '../src/lib/datocms';
import { QueryResponseType } from '../src/lib/types';

type Props = {
  data: QueryResponseType
}

export async function getStaticProps() {
  const data = await loadData();

  return {
    props: {
      data
    },
  }
}


const App = ({ data }: Props) => {

  return (
    <>
      <Head>
        <title>Edson Lucas | FrontEnd dev</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data && (

        <div className="w-screen h-screen bg-gradientRadial from-comment via-current-line to-background">
          <Header 
            logoImg={data.headerMenu.headerMenu?.header.logoImg} 
            menuItems={data.headerMenu.headerMenu?.header.menuItems}
          />
        </div>
      )}
    </>
  )
}

export default App;