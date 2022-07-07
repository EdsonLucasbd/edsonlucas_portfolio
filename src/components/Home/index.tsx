import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { getHomeData, responsiveImageFragment, fetchAPI } from "../../lib/api";

const data = gql`
  query home {
    bgPhoto {
      responsiveImage(imgixParams: {auto: format, fit: crop, h: "1834", w: "4659"}) {
        ...responsiveImageFragment
      }
    }
    job
    name
  }
  ${responsiveImageFragment}
`

// export const getStaticProps = async ({ preview = null }) => {
//   const homeData = (await getHomeData( preview )) || []
//   return {
//     props: homeData,
//   }
// }
export const getStaticProps: GetStaticProps = async () => {
  const graphqlRequest = {
    query: data,
    variables: { limit: 10 },
  };
  return {
    props: {
      subscription: {
        ...graphqlRequest,
        initialData: await fetchAPI(graphqlRequest),
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
      }
    },
  }
};

export const Home: React.FC = ({ subscription }: any) => {
  subscription &&  console.log("subscription", subscription)
  
  return( 
    <div className="container mx-auto w-screen h-full bg-current-line">
      <div className="flex flex-col pt-[18.63rem] pl-[9rem]">
        <h1 className="font-title text-[3.5rem]">Olá, me chamo Lucas</h1>
        <h2 className="font-body text-2xl">Desenvolvedor de Software FrontEnd</h2>
      </div>
    </div>
  );
}