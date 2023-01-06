import { useEffect, useState } from "react";
import { ResponsiveImageType } from "react-datocms";

import Fade from 'react-reveal/Fade';

interface IHomeProp {
  bgPhoto: ResponsiveImageType[]
  job: string;
  name: string;
}

export const Home = ({ bgPhoto, job, name }: IHomeProp) => {
  const [homeBgImage, setHomeBgImage] = useState(bgPhoto[0])

  function debounce(func: Function, ms: number) {
    let timer: null | ReturnType<typeof setTimeout>;
    return function () {
      clearTimeout(timer!)
      timer = setTimeout(function () {
        timer = null
        func.apply(func, [arguments])
      }, ms)
    };
  }

  useEffect(() => {
    if (window.innerWidth < 640) {
      setHomeBgImage(bgPhoto[1])
    }

    const debouncedHandleResize = debounce(function () {
      if (window.innerWidth < 640) {
        setHomeBgImage(bgPhoto[1])
      } else setHomeBgImage(bgPhoto[0])
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  }, [])

  return (
    <>
      <div id="home" className="max-w-md sm:max-w-full bg-center mx-auto h-screen 
        bg-no-repeat bg-cover" style={{ backgroundImage: `url(${homeBgImage?.src})` }}>
        <div className="flex flex-col pt-60 sm:pt-[18.63rem] pl-8 sm:pl-36">
          <Fade left cascade>
            <>
              <h1 className="font-title text-4xl sm:text-[3.5rem]">{name}</h1>
              <h2 dangerouslySetInnerHTML={{ __html: job }} className="font-body text-xl sm:text-2xl" />
            </>
          </Fade>
        </div>
        <div className="scrollIcon w-[1.875rem] h-[3.125rem] -ml-[.75rem] desktop:-ml-[3.75rem] top-[95%] z-10 -mt-[2.1875rem] rounded-3xl shadow-[inset_0_0_0_.0625rem_#fff]" aria-hidden="true"></div>
      </div>
    </>
  );
}