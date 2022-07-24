import { ResponsiveImageType } from "react-datocms";

export type HeaderTypes = {
  logo: {
    logomarca: {
      responsiveImage: ResponsiveImageType,
    };
  }
  sectionsHeader: {
    aSection: {
      title: string,
      link: string,
      id: string,
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
  headerMenu: HeaderTypes;
  home: HomeTypes;
  network: Network;
  project: Project;
};

export type QueryVariables = {
  first: number;
};