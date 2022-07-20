import { HeaderItems } from "../../lib/types";

interface IHeaderProps {
  headerData: HeaderItems
}

export const Header = ({headerData}: IHeaderProps) => {
  console.log("dados HEADER...", headerData.headerMenu)
  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      {headerData && (
        <>
          {/* <Image
            data={data.imageData}
          /> */}
          {headerData.headerMenu?.header.menuItems.map(( menuItem ) => {
            <span className="flex items-center justify-between w-44 text-purple">
                <a key={menuItem.id} href={menuItem.link} className="font-body text-base">{menuItem.sectionTitle}</a>
            </span>
          })}
        </>
      )}
    </header>
  );
}