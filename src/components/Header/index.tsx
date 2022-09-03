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
  const sectionsRef = useRef<HTMLDivElement>(null);

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

    const menuItems = Array.from(sectionsRef.current?.children!)

    const scrollToPosition = (to: number) => {
      window.scroll({
        top: to,
        behavior: 'smooth',
      });
    }

    const getScrollTop = (element: HTMLElement) => {
      if (element !== null) {
        const id = element.getAttribute('href') as string;
        const itemElement = document.querySelector(id) as HTMLElement
        return itemElement.offsetTop;
      }
    }

    const scrollOnClick = (e: Event) => {
      let event = e.target

      e.preventDefault();
      const to = getScrollTop(event as HTMLElement);

      scrollToPosition(to as number);
    }

    menuItems.forEach(item => {
      item.addEventListener('click', scrollOnClick);
    })

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])


  const sectionItems = sections.map((section) =>
    <a key={section.id} href={section.link} className="font-body text-base transition-all ease-in-out duration-300 hover:text-foreground" aria-label={`Ir para a seção de ${section.title}`}>{section.title}</a>
  )

  return (
    <div className="main-header">
      <header ref={headerRef} className="w-full laptop:w-screen mx-auto h-12 flex items-center justify-between p-4 z-50 fixed-header">
        <>
          <Image data={logoImg} />
          <span ref={sectionsRef} className="flex items-center justify-between w-44 text-purple">
            {sectionItems}
          </span>
        </>
      </header>
    </div>
  );
}