import Head from 'next/head'
import { Header } from '@components/Header'
import { Home } from '@components/Home'
import { loadData, loadHeaderData } from '@lib/datocms';
import { QueryResponseType } from '@lib/types';
import { ResponsiveImageType } from 'react-datocms';
import { SocialLinks } from '@components/SocialLinks';
import { ProjectCarousel } from '@components/ProjectCarousel';
import { Contact } from '@components/Contact';
import { BackToTopButton } from '@components/ScrollTopButton';

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

export async function getStaticProps() {
  const data = await loadData();

  return {
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
            <meta name="description" />
            <link rel="icon" href={tab?.icon.url} />
          </Head>
          <div className="max-w-md mobile:max-w-full h-screen bg-gradientRadial from-comment via-current-line to-background">
            <Header logoImg={logoImg} sections={sections} />
            <SocialLinks socialNetwork={networks} />
            <Home bgPhoto={[heroBg, mobileBgPhoto]} job={job} name={name} />
            <ProjectCarousel projects={projects} />
            <Contact logo={contactLogo} />
            <BackToTopButton />
          </div>
        </>
      )}
    </>
  )
}

export default App;