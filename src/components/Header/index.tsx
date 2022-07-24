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
  const sectionItems = sections.map((section) => 
    <a key={section.id} href={section.link} className="font-body text-base">{section.title}</a>
  )

  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <>
        <Image data={logoImg}/>
        <span className="flex items-center justify-between w-44 text-purple">
          {sectionItems}
        </span>
      </>
    </header>
  );
}