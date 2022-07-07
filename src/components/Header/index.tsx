import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "../../lib/apollo";

import { fetchAPI, getHeaderData, responsiveImageFragment } from '../../lib/api';
import { GetStaticProps, NextPage } from "next";

const HEADER_DATA = gql`
  query {
    headerMenu {
      header {
        ... on LogoRecord {
          logoImg {
            responsiveImage(imgixParams: {auto: format, fit: crop, h: "250", w: "250"}) {
              ...responsiveImageFragment
            }
          }
        }
        ... on HeaderItemRecord {
          menuItems {
            id
            sectionTitle
            link
          }
        }
      }
    }
  }
  ${responsiveImageFragment}
`

interface Props {
  subscription: any,
}

interface ILogo {
  logoImg: {
    responsiveImage: {
      src: string;
      alt: string;
    },
  }
}

interface IMenuItems {
  id: string,
  sectionTitle: string,
  link: string,
}
type MenuItemsType = IMenuItems[];

interface IHeader {
  0: ILogo;
  1: [
    menuItems: IMenuItems
  ];
}

export const getStaticProps: GetStaticProps = async () => {
  const graphqlRequest = {
    query: HEADER_DATA,
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

export const Header: NextPage<Props> = ({ subscription }) => {
  console.log("subscription Head", subscription)

  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      {/* {headerData &&
        <>
          <Image src={headerData[0].logoImg.responsiveImage.src} alt={data.logoImg.responsiveImage.alt} width={40} height={40} />
          <span className="flex items-center justify-between w-44 text-purple">
            {data.map(({ menuItem }) => {
              <a key={menuItem.id} href={menuItem.link} className="font-body text-base">{menuItem.sectionTitle}</a>
            })}
          </span>
        </>
      } */}
    </header>
  );
}