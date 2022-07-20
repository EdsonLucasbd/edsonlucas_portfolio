import { ResponsiveImageType } from "react-datocms";

export type HeaderItems = {
  headerMenu: {
    header: {
      logoImg: {
        responsiveImage: ResponsiveImageType,
      };
      menuItems: [{
        id: string,
        sectionTitle: string,
        link: string,
      }]
    }
  }
}

export type HomeTypes = {
  home: {
    bgPhoto:  {
      url: string,
    };
    name: string;
    job: string;
  }
}

export type Network = {
  network: {
    socialNetwork: {
      id: string,
      networkName: string,
      link: string,
    }
  }
}

export type Project = {
  project: {
    projectItem: {
      id: string,
      projectIcon: {
        responsiveImage: ResponsiveImageType,
      }
      projectName: string,
      projectLink: string,
    }
  }
}

export type QueryResponseType = {
  headerMenu: HeaderItems;
  home: HomeTypes;
  network: Network[];
  project: Project[];
};

export type QueryVariables = {
  first: number;
};