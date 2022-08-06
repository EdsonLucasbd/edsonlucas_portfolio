import React, { useEffect } from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Glide from '@glidejs/glide'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { Image, ResponsiveImageType } from 'react-datocms';

export interface IProjects {
  projects: [{
    projectIcon: {
      responsiveImage: ResponsiveImageType,
    }
    id: string,
    projectName: string,
    projectLink: string,
  }];
}

export const ProjectCarousel = ({ projects }: IProjects) => {

  const projectsList = projects.map((project) =>
    <SwiperSlide key={project.id}>
      <Image data={project.projectIcon.responsiveImage}/>
    </SwiperSlide>
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
        pagination={{ clickable: true }}
        loop={true}
      >
        {projectsList}
      </Swiper>
    </div>
  );
}
