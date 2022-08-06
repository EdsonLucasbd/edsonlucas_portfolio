import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { ResponsiveImageType } from "react-datocms";
import { HomeTypes } from "../../lib/types";

interface IHomeProp {
  bgPhoto: ResponsiveImageType
  job: string;
  name: string;
}

export const Home = ({ bgPhoto, job, name }: IHomeProp) => {
  
  return( 
    <>
      <div className="mx-auto h-screen bg-no-repeat bg-cover bg-col" style={{backgroundImage: `url(${bgPhoto?.src})`}}>
        <div className="flex flex-col pt-[18.63rem] pl-[9rem]">
          <h1 className="font-title text-[3.5rem]">{name}</h1>
          <h2 className="font-body text-2xl">{job}</h2>
        </div>
      </div>
    </>
  );
}