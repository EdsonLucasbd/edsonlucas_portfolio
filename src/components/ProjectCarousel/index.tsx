import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Fade from 'react-reveal/Fade';

import { Image, ResponsiveImageType } from 'react-datocms';

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

  const projectsList = projects.map((project) =>
    <>
      <SwiperSlide key={project.id}>
        <Image data={project.projectIcon.responsiveImage} aria-hidden="true" />
        <h4 className="title text-xl text-center mobile:text-2xl" aria-live='polite'>{project.projectName}</h4>
        <p className="subtitle font-body text-sm mobile:text-base">{project.projectDescription}</p>
        <a role={'button'} className="absolute rounded flex justify-center items-center top-[23rem] mobile:top-96 w-[8.07rem] h-[1.94rem] bg-current-line text-base" href={project.projectLink} target='_blank' rel='noreferrer noopener' aria-label={`Acessar o projeto ${project.projectName} em uma nova aba`} >Ver projeto</a>
      </SwiperSlide>,
    </>

  )

  return (
    <div id='project' className="flex flex-col justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <Fade top cascade>
        <h3 className="text-4xl mobile:text-[2.3rem] mb-[5.69rem] font-title max-w-[22.5rem] h-[7.63rem] text-center drop-shadow-lg">Conheça Alguns dos Meus Projetos</h3>
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
