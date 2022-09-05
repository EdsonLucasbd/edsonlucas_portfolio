import { useEffect, useState } from "react";
import { ResponsiveImageType } from "react-datocms";
import { BsChevronDown } from "react-icons/bs";

import Fade from 'react-reveal/Fade';

interface IHomeProp {
  bgPhoto: ResponsiveImageType[]
  job: string;
  name: string;
}

export const ScrollDown = () => {
  return (
    <div className="absolute left-[50%] bottom-2 mobile:bottom-8 animate-bounce-slow flex flex-col items-center text-foreground-900">
      <p aria-label="Role para baixo para conhecer meus projetos">Scroll</p>
      <BsChevronDown className="h-8 w-8" />
    </div>
  )
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
      <div id="home" className="max-w-md mobile:max-w-full bg-center mx-auto h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${homeBgImage?.src})` }}>
        <div className="flex flex-col pt-96 mobile:pt-[18.63rem] pl-8 mobile:pl-36">
          <Fade left cascade>
            <>
              <h1 className="font-title text-4xl mobile:text-[3.5rem]">{name}</h1>
              <h2 className="font-body text-xl mobile:text-2xl">{job}</h2>
            </>
          </Fade>
        </div>
        <ScrollDown />
      </div>
    </>
  );
}