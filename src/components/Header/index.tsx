import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Image, ResponsiveImageType } from "react-datocms";
import { MdOutlineTranslate } from 'react-icons/md';

interface IHeaderProp {
  logoImg: ResponsiveImageType;
  sections: [{
    id: string,
    title: string,
    link: string,
  }]
}

export const Header = ({ logoImg, sections }: IHeaderProp) => {
  const currentPath = useRouter().asPath;

  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  var lastPosition = 0;

  useEffect(() => {
    const menuItems = Array.from(sectionsRef.current?.children!)

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

      if (sectionsRef.current) {
        if (window.scrollY >= 558 && window.scrollY < 1490 && window.innerWidth > 640) {
          menuItems[0].classList.add('text-purple')
        } else if (window.scrollY >= 558 && window.scrollY < 1330 && window.innerWidth <= 640) {
          menuItems[0].classList.add('text-purple')
        } else menuItems[0].classList.remove('text-purple')

        if (window.scrollY > 1490 && window.innerWidth > 640) {
          menuItems[1].classList.add('text-purple')
        } else if (window.scrollY > 1330 && window.innerWidth <= 640) {
          menuItems[1].classList.add('text-purple')
        } else menuItems[1].classList.remove('text-purple')
      } else return;

      lastPosition = currentPosition;
      console.log(lastPosition);
    }


    window.addEventListener("scroll", scroll)

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
    <a key={section.id} href={section.link} className="font-body text-sm laptop:text-base transition-all ease-in-out duration-300 hover:text-purple" aria-label={`Ir para a seção de ${section.title}`}>{section.title}</a>
  )

  return (
    <div className="main-header">
      <header ref={headerRef} className="w-full laptop:w-screen mx-auto h-12 flex items-center justify-between p-4 z-50 fixed-header">
        <>
          <Image data={logoImg} />
          <div className="flex items-center justify-between w-48 laptop:w-64">
            <span ref={sectionsRef} className="flex items-center gap-4 laptop:gap-8 justify-between text-foreground">
              {sectionItems}
            </span>
            <span className="group flex flex-row gap-3 hover:-mr-4 laptop:hover:-mr-0 align-center justify-center">
              <MdOutlineTranslate className="group-hover:hidden relative w-5 h-5 tablet:w-4 tablet:h-4 translate-y-1/2  tablet:translate-y-0 left-8 transition-all ease-in-out duration-300" />
              <Link href={currentPath} locale='pt-BR' aria-label="Alterar o idioma do portfólio para português do Brasil">
                <a className="opacity-0 flex group-hover:opacity-100 hover:text-purple font-body text-sm  transition-all ease-in-out duration-300">
                  PT-BR
                </a>
              </Link>
              <Link href={currentPath} locale='en' aria-label="Alterar o idioma do portfólio para inglês">
                <a className="opacity-0 flex group-hover:opacity-100 hover:text-purple font-body text-sm transition-all ease-in-out duration-300">
                  EN
                </a>
              </Link>
            </span>
          </div>
        </>
      </header>
    </div>
  );
}