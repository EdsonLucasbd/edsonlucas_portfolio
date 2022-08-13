import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
        <Image data={project.projectIcon.responsiveImage} />
        <div className="title text-2xl">{project.projectName}</div>
        <div className="subtitle font-body text-base">{project.projectDescription}</div>
        <a role={'button'} className="absolute rounded flex justify-center items-center top-96 w-[8.07rem] h-[1.94rem] bg-current-line text-base" href={project.projectLink} target='_blank' rel='noreferrer noopener'>Ver projeto</a>
      </SwiperSlide>,
    </>

  )

  return (
    <div id='project' className="flex flex-col justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <h1 className="text-[2.5rem] mb-[9.69rem] font-title max-w-[22.5rem] h-[7.63rem] text-center drop-shadow-lg">Conheça Alguns dos Meus Projetos</h1>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={-20}
        centeredSlides={true}
        slidesPerView={3}
        navigation={true}
        draggable={true}
        loop={true}
      >
        {projectsList}
      </Swiper>
      {/* <p>{subtitle}</p> */}
    </div>
  );
}
