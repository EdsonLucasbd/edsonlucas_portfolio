import { gql } from "@apollo/client"
import tiny from 'tiny-json-http';

const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN

export const responsiveImageFragment = gql`
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`
interface RequestParams {
  query: string;
  variables?: {
    limit: number
  };
  preview?: boolean;
}

export const fetchAPI = async ({ query, variables, preview }: RequestParams) => {

  const endpoint = preview
    ? `https://graphql-listen.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },
    data: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await body.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.body.data;
}

export async function getHeaderData(preview) {
  const data = await fetchAPI(
    gql`
      query headerMenu {
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
      ${responsiveImageFragment}
    `,
    {preview}
  )
  return data;
}

export async function getHomeData(preview) {
  const data = await fetchAPI(
    gql`
      home {
        bgPhoto {
          responsiveImage(imgixParams: {auto: format, fit: crop, h: "1834", w: "4659"}) {
            ...responsiveImageFragment
          }
        }
        job
        name
      }
      ${responsiveImageFragment}
    `,
    {preview}
  )

  return data;
}

export async function getAllProjects() {
  const data = await fetchAPI(
    gql`
      project {
        projectItem {
          id
          projectIcon {
            responsiveImage(imgixParams: {auto: format, fit: crop, h: "80", w: "80"}) {
              ...responsiveImageFragment
            }
          }
          projectName
          projectLink
          projectDescription
        }
      }
      ${responsiveImageFragment}
    `
  )

  return data?.project.project_item;
} 

export async function getSocialNetworkData() {
  const data = await fetchAPI(
    gql`
      network {
        socialNetwork {
          id
          networkName
          link
        }
      }
    `
  )

  return data?.network;
}