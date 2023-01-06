import Head from 'next/head'
import { Header } from '@components/Header'
import { Home } from '@components/Home'
import { loadData } from '@lib/datocms';
import { QueryResponseType } from '@lib/types';
import { ResponsiveImageType } from 'react-datocms';
import { SocialLinks } from '@components/SocialLinks';
import { ProjectCarousel } from '@components/ProjectCarousel';
import { Contact } from '@components/Contact';
import { BackToTopButton } from '@components/ScrollTopButton';
import { NextRouter } from 'next/router';

type Props = {
  data: QueryResponseType,
  logoImg: ResponsiveImageType,
  contactLogo: ResponsiveImageType,
  sections: [{
    id: string,
    title: string,
    link: string,
  }];
  heroBg: ResponsiveImageType,
  mobileBgPhoto: ResponsiveImageType,
  job: string
  name: string
  networks: [{
    id: string,
    networkName: string,
    link: string,
  }];
  projects: [{
    projectIcon: {
      responsiveImage: ResponsiveImageType,
    }
    id: string,
    projectName: string,
    projectDescription: string,
    projectLink: string,
  }];
  tab: {
    icon: {
      url: string,
    }
    tabTitle: string
  }
}

export async function getStaticProps({ locale }: NextRouter) {

  const data = await loadData(locale);

  return {
    revalidate: 60,
    props: {
      data,
      logoImg: data?.logo.logomarca.responsiveImage,
      contactLogo: data?.contact.contactLogo.responsiveImage,
      sections: data?.sectionsHeader.aSection,
      heroBg: data?.home.bgPhoto.responsiveImage,
      mobileBgPhoto: data?.home.mobileBgPhoto.responsiveImage,
      job: data?.home.job,
      name: data?.home.name,
      networks: data?.network.socialNetwork,
      projects: data?.project.projectItem,
      tab: data?.tab,
    },
  }
}

const App = ({
  data,
  logoImg,
  contactLogo,
  sections,
  heroBg,
  mobileBgPhoto,
  job,
  name,
  networks,
  projects,
  tab }: Props) => {

  return (
    <>
      {data && (
        <>
          <Head>
            <title>{tab?.tabTitle}</title>
            <link rel="icon" href={tab?.icon.url} />
          </Head>
          <main className="max-w-md sm:max-w-full h-screen bg-gradientRadial from-comment via-current-line to-background">
            <Header logoImg={logoImg} sections={sections} />
            <SocialLinks socialNetwork={networks} />
            <Home bgPhoto={[heroBg, mobileBgPhoto]} job={job} name={name} />
            <ProjectCarousel projects={projects} />
            <Contact logo={contactLogo} />
            <BackToTopButton />
          </main>
        </>
      )}
    </>
  )
}

export default App;