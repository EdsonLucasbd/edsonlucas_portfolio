import Link from "next/link";
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
  const headerRef = useRef<HTMLDivElement>(null);

  var lastPosition = 0;

  useEffect(() => {
    function scroll() {
      var currentPosition = window.scrollY;

      if (headerRef.current) {
        if (currentPosition > lastPosition && window.scrollY < 150) {
          headerRef.current.classList.add("bg-current-line");
          headerRef.current.classList.remove("bg-foreground", "bg-opacity-20", "backdrop-blur-lg");
        }
        else if (currentPosition > lastPosition && window.scrollY >= 150) {
          headerRef.current.style.transition = "transform 300ms ease 0s";
          headerRef.current.classList.add("bg-foreground", "bg-opacity-20", "backdrop-blur-lg");
        } else {
          headerRef.current.style.transition = "transform 300ms ease 0s";
          headerRef.current.style.transform = "translate(0, 0)";
        }
      } else return;

      lastPosition = currentPosition;
    }

    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  const sectionItems = sections.map((section) =>
    <Link key={section.id} href={section.link} className="font-body text-base transition-all ease-in-out duration-300 hover:text-foreground" aria-label={`Ir para a seção de ${section.title}`}>{section.title}</Link>
  )

  return (
    <div className="main-header">
      <header ref={headerRef} className="w-full laptop:w-screen mx-auto h-12 flex items-center justify-between p-4 z-50 fixed-header">
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