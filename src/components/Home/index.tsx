import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { HomeTypes } from "../../lib/types";

interface Props {
  homeData: HomeTypes;
}

export const Home = ({ homeData }: Props) => {
  console.log("dados HOME...", homeData && homeData)
  const job = homeData.home?.job
  const name = homeData.home?.name
  console.log("dados HOME...", homeData && job, name)
  
  return( 
    <>
      {homeData && (
        <div className="container mx-auto w-screen h-full bg-fixed" style={{backgroundImage: `url(${homeData.home?.bgPhoto.url})`}}>
          <div className="flex flex-col pt-[18.63rem] pl-[9rem]">
            <h1 className="font-title text-[3.5rem]">Olá, me chamo Lucas</h1>
            <h2 className="font-body text-2xl">Desenvolvedor de Software FrontEnd</h2>
          </div>
        </div>
      )}
    </>
  );
}