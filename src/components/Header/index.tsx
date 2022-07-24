import { ResponsiveImageType } from "react-datocms";
import { HeaderTypes } from "../../lib/types";

type headerProp = {
  logoImg: {
    responsiveImage: ResponsiveImageType,
  };
  menuItems: [{
    id: string,
    sectionTitle: string,
    link: string,
  }]
}

export const Header = ({ logoImg, menuItems }: headerProp) => {
  console.log("dados HEADER logo...", logoImg)
  console.log("dados HEADER menuItems...", menuItems)
  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <>
        {/* <Image
          data={data.imageData}
        /> */}
        {menuItems?.map(( menuItem ) => {
          <span className="flex items-center justify-between w-44 text-purple">
              <a key={menuItem.id} href={menuItem.link} className="font-body text-base">{menuItem.sectionTitle}</a>
          </span>
        })}
      </>
    </header>
  );
}