import { gql } from "graphql-request";

import { HeaderTypes, QueryResponseType } from "./types";

const API_URL = 'https://graphql.datocms.com/'
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN

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

const ptQuery = gql`
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

    sectionsHeader(locale: pt_BR) {
      aSection {
        title
        link
        id
      }
    }
    home(locale: pt_BR) {
      bgPhoto {
        responsiveImage(imgixParams: {fm: webp, auto: compress, fit: max}, sizes: "(max-width: 300px) 100vw, 600px"){
          src
          width
          height
        }
      }
      mobileBgPhoto {
        responsiveImage(imgixParams: {fm: webp, auto: compress, fit: max}, sizes: "(max-width: 460px) 100vw, 600px") {
          src
          width
          height
        }
      }
      job
      name
    }
    project(locale: pt_BR) {
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

const enQuery = gql`
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

    sectionsHeader(locale: en) {
      aSection {
        title
        link
        id
      }
    }
    home(locale: en) {
      bgPhoto {
        responsiveImage(imgixParams: {fm: webp, auto: compress, fit: max}, sizes: "(max-width: 300px) 100vw, 600px"){
          src
          width
          height
        }
      }
      mobileBgPhoto {
        responsiveImage(imgixParams: {fm: webp, auto: compress, fit: max}, sizes: "(max-width: 460px) 100vw, 600px") {
          src
          width
          height
        }
      }
      job
      name
    }
    project(locale: en) {
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
    // throw new Error('Failed to fetch API')
    throw JSON.stringify(json.errors)
  }
  return json.data
}

export async function loadData(locale: string | undefined): Promise<QueryResponseType> {
  const selectedQuery = locale === 'pt-BR' ? ptQuery : enQuery
  const data = await fetchAPI(selectedQuery);

  return data && data
}
export async function loadHeaderData(): Promise<HeaderTypes> {
  const data = await fetchAPI(headerQuery);

  return data && data
}