import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useQuerySubscription } from 'react-datocms'
import { Header } from '../src/components/Header'
import { Home } from '../src/components/Home'
import { QueryResponseType, QueryVariables } from '../src/lib/types'
import { query } from '../src/lib/datocms'


const App: NextPage = () => {

  const { status, error, data } = useQuerySubscription<
    QueryResponseType,
    QueryVariables
  >({
    query,
    variables: { first: 10 },
    token: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  });

  const statusMessage = {
    connecting: "Connecting to DatoCMS...",
    connected: "Connected to DatoCMS, receiving live updates!",
    closed: "Connection closed",
  };

  /* if (status === "connected") {
    console.log(statusMessage.connected)
  } else if (status === "closed") (
    console.log(statusMessage.closed)
  ) */
  console.log(statusMessage[status])
  if (error) {
    console.log(JSON.stringify(error.response, null, 2))
  }
  console.log(data)

  return (
    <>
      <Head>
        <title>Edson Lucas | FrontEnd dev</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { data && (
        <div className="w-screen h-screen bg-gradientRadial from-comment via-current-line to-background">
          <Header headerData={data?.headerMenu}/>
          <Home homeData={data.home}/>
        </div>
        )
      }
    </>
  )
}

export default App;

/* export const getStaticProps = async () =>  {
  const headerMenu = await getHeaderData();

  return {
    props: {
      headerMenu
    },
    // revalidate: 60
  };
} */