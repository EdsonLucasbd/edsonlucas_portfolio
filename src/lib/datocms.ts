import { gql, GraphQLClient } from "graphql-request";

import {post} from 'tiny-json-http';
import { HeaderTypes, QueryResponseType } from "./types";

const API_URL = 'https://graphql.datocms.com/'
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN


export function request(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = {
    authorization: `Bearer ${API_TOKEN}`,
  };
  const client = new GraphQLClient(`${API_URL}`, { headers });
  return client.request(query, variables);
}

const responsiveImageFragment = `
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
`;

const fullQuery = gql`
  query MyQuery {
    headerMenu {
      header {
        ... on LogoRecord {
          logoImg {
            responsiveImage(imgixParams: {auto: format, fit: crop, h: "250", w: "250"}) {
              ${responsiveImageFragment}
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
    home {
      bgPhoto {
        url(imgixParams: {auto: format, fit: crop, h: "1834", w: "4659", maxH: "3616", maxW: "6000"})
      }
      name
      job
    }
    network {
      socialNetwork {
        id
        networkName
        link
      }
    }
    project {
      projectItem {
        id
        projectIcon {
          responsiveImage(imgixParams: {auto: format, fit: crop, h: "500", w: "500"}) {
            ${responsiveImageFragment}
          }
        }
        projectName
        projectLink
      }
    }
  }
`
const headerQuery = gql`
  query MyQuery {
    logo {
      logomarca {
        responsiveImage(imgixParams: {auto: format, fit: crop, h: "50", w: "50"}) {
          ${responsiveImageFragment}
        }
      }
    }

    sectionsHeader {
      aSection {
        title
        link
        id
      }
    }
  }
`

interface RequestParams {
  variables?: Record<string, any>,
  preview?: boolean
}

async function fetchAPI(query: string, { variables, preview }: RequestParams = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error("UM ERRO!", json.errors)
    //throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function loadData(): Promise<QueryResponseType> {
  const data = await fetchAPI(fullQuery);

  return data && data
}
export async function loadHeaderData(): Promise<HeaderTypes> {
  const data = await fetchAPI(headerQuery);

  return data && data
}