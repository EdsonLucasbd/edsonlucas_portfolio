import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Fade from 'react-reveal/Fade';

import { Image, ResponsiveImageType } from 'react-datocms';
import i18n from '@lib/i18n';
import { useRouter } from 'next/router';

export interface IProjects {
  projects: [{
    projectIcon: {
      responsiveImage: ResponsiveImageType,
    }
    id: string,
    projectName: string,
    projectDescription: string,
    projectLink: string,
  }];
}

export const ProjectCarousel = ({ projects }: IProjects) => {
  const { locale } = useRouter()

  let LocaleType: {
    en: string,
    'pt-BR': string
  }

  const currentLocale = locale as keyof typeof LocaleType

  const projectsList = projects.map((project) =>
    <>
      <SwiperSlide key={project.id}>
        <Image data={project.projectIcon.responsiveImage} aria-hidden="true" />
        <h4 className="title text-xl text-center sm:text-2xl" aria-live='polite'>{project.projectName}</h4>
        <p className="subtitle font-body text-sm sm:text-base">{project.projectDescription}</p>
        <a
          role={'button'}
          className="linkButton absolute rounded hidden justify-center items-center top-[23rem] sm:top-96 w-[8.5rem] h-[1.94rem] bg-comment text-base hover:w-36 hover:h-9 hover:text-lg transition-all ease-in-out"
          href={project.projectLink}
          target='_blank'
          rel='noreferrer noopener'
          aria-label={`${i18n.projects['aria-label-start'][currentLocale]} ${project.projectName} ${i18n.projects['aria-label-final'][currentLocale]}`}
        >
          {i18n.projects.btn[currentLocale]}
        </a>
      </SwiperSlide>,
    </>

  )

  return (
    <div id='project' className="flex flex-col justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <Fade top cascade>
        <>
          <h3 className="text-4xl sm:text-[2.3rem] mb-[5.69rem] font-title max-w-[22.5rem] h-[7.63rem] text-center drop-shadow-lg">{i18n.projects.title[currentLocale]}</h3>
        </>
      </Fade>
      <Fade bottom>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={-20}
          centeredSlides={true}
          slidesPerView={3}
          navigation={true}
          draggable={true}
          loop={true}
          a11y={{
            prevSlideMessage: "Slide anterior",
            nextSlideMessage: "Próximo slide"

          }}
        >
          {projectsList}
        </Swiper>
      </Fade>
    </div>
  );
}
