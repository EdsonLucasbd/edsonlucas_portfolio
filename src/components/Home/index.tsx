import { ResponsiveImageType } from "react-datocms";

import Fade from 'react-reveal/Fade';

interface IHomeProp {
  bgPhoto: ResponsiveImageType
  job: string;
  name: string;
}

export const Home = ({ bgPhoto, job, name }: IHomeProp) => {

  return (
    <>
      <div id="home" className="max-w-md sm:max-w-full bg-center mx-auto h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgPhoto?.src})` }}>
        <div className="flex flex-col pt-96 sm:pt-[18.63rem] pl-8 sm:pl-36">
          <Fade left cascade>
            <h1 className="font-title text-4xl sm:text-[3.5rem]">{name}</h1>
            <h2 className="font-body text-xl sm:text-2xl">{job}</h2>
          </Fade>
        </div>
      </div>
    </>
  );
}