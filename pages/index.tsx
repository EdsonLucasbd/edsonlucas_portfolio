import Head from 'next/head'
import { Header } from '@components/Header'
import { Home } from '@components/Home'
import { loadData, loadHeaderData } from '@lib/datocms';
import { QueryResponseType } from '@lib/types';
import { ResponsiveImageType } from 'react-datocms';

type Props = {
  data: QueryResponseType
  logoImg: ResponsiveImageType
  sections: [{
    id: string,
    title: string,
    link: string,
  }]
}

export async function getStaticProps() {
  const data = await loadHeaderData();

  return {
    props: {
      logoImg: data?.logo.logomarca.responsiveImage,
      sections: data?.sectionsHeader.aSection,
      data
    },
  }
}


const App = ({ logoImg, sections, data }: Props) => {

  return (
    <>
      <Head>
        <title>Edson Lucas | FrontEnd dev</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data && (

        <div className="w-screen h-screen bg-gradientRadial from-comment via-current-line to-background">
          <Header logoImg={logoImg} sections={sections}/>
        </div>
      )}
    </>
  )
}

export default App;