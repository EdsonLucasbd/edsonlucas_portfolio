import React, { useEffect } from 'react';
import '../../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'

import Glide from '@glidejs/glide'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { IProjects, Project } from '@components/Project';

export const ProjectCarousel = ({ projects }: IProjects) => {

  const sliderConfiguration: Glide.Options = {
    type: "carousel",
    autoplay: 3000,
    hoverpause: true,
    gap: 10,
    perView: 3,
    focusAt: "center",
  };

  const slider = new Glide('.glide', sliderConfiguration)
  useEffect(() => {
    slider.mount()
  },[])
  return (
    <div id='project' className="flex flex-col justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <h1 className="text-[2.5rem] mb-[9.69rem] font-title max-w-[22.5rem] h-[7.63rem] text-center ">Conheça Alguns dos Meus Projetos</h1>
      <div className='glide'>
        <div data-glide-el="track" className="glide__track slider__track">
          <ul className="slider__slides glide__slides">
            <Project projects={projects} />
          </ul>
        </div>
        <div data-glide-el="controls">
          <button className="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev" data-glide-dir="<"><FiArrowLeft/></button>
          <button className="slider__arrow slider__arrow--next glide__arrow glide__arrow--next" data-glide-dir=">"><FiArrowRight/></button>
        </div>
      </div>
    </div>
  );
}
