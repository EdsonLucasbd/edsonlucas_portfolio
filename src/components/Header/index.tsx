import { useEffect, useRef } from "react";
import { Image, ResponsiveImageType } from "react-datocms";

interface IHeaderProp {
  logoImg: ResponsiveImageType;
  sections: [{
    id: string,
    title: string,
    link: string,
  }]
}

export const Header = ({ logoImg, sections }: IHeaderProp) => {
  let of_home = 0;
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef?.current) {
      console.log(headerRef.current);
    }
  }, [headerRef])

  function getPositionWindow() {
    let position_window = window.pageYOffset;
    return position_window;
  }

  var lastPosition = 0;

  useEffect(() => {
    function scroll() {
      var currentPosition = window.scrollY;

      if (currentPosition > lastPosition && window.scrollY >= 150) {
        headerRef.current.style.transition = "transform 300ms ease 0s";
        headerRef.current.style.transform = "translate(0, -70px)";
        // headerRef.current.classList.remove("fixed-header");

      } else {
        headerRef.current.style.transition = "transform 300ms ease 0s";
        headerRef.current.style.transform = "translate(0, 0)";
        // headerRef.current.classList.add("fixed-header");
      }
      lastPosition = currentPosition;
    }

    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  const sectionItems = sections.map((section) =>
    <a key={section.id} href={section.link} className="font-body text-base transition-all ease-in-out duration-300 hover:text-foreground">{section.title}</a>
  )

  return (
    <div className="main-header">
      <header ref={headerRef} className="container mx-auto h-12 flex items-center justify-between p-4 bg-background z-50 fixed-header">
        <>
          <a href="#home" aria-label="Voltar para a sessão inicial do portfólio">
            <Image data={logoImg} />
          </a>
          <span className="flex items-center justify-between w-44 text-purple">
            {sectionItems}
          </span>
        </>
      </header>
    </div>
  );
}