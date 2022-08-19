import { gql, GraphQLClient } from "graphql-request";

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
    logo {
      logomarca {
        responsiveImage(imgixParams: {auto: format, fit: crop, h: "50", w: "50"}) {
          ${responsiveImageFragment}
        }
      }
    }

    contact {
      contactLogo {
        responsiveImage(imgixParams: {auto: format, fit: crop, h: "150", w: "150"}){
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
    home {
      bgPhoto {
        responsiveImage(imgixParams: {fm: webp, auto: compress, fit: max}, sizes: "(max-width: 300px) 100vw, 600px"){
          src
          width
          height
        }
      }
      job
      name
    }
    project {
      projectItem {
        projectIcon {
          responsiveImage(imgixParams: {auto: compress, fit: max, maxW: "1600", maxH: "804"}) {
            ${responsiveImageFragment}
          }
        }
        projectName
        projectDescription
        projectLink
        id
      }
    }
    network {
      socialNetwork {
        id
        networkName
        link
      }
    }
    tab {
      icon {
        url
      }
      tabTitle
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
    throw new Error('Failed to fetch API')
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