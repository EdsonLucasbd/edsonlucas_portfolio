import React from 'react';
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


export const Project = ({ projects }: IProjects) => {
  let num = 0

  return (
    <>
      { projects.map((project) =>
        <li 
          key={project.id} 
          className="
            glide__slide blur-md opacity-30 
            transition-all ease-linear 
            duration-100 overflow-visible
            bg-current-line
            flex justify-center items-center"
          >
          {/* <Image data={project.projectIcon.responsiveImage} className="w-full h-full"/> */}
          {num++}
        </li>
      )}
    </>
  );
}
