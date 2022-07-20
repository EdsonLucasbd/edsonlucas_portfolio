import { gql, GraphQLClient } from "graphql-request";

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

export const query = gql`
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
export const headerQuery = gql`
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
  }
`