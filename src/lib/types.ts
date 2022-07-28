import { ResponsiveImageType } from "react-datocms";

export type HeaderTypes = {
  logo: {
    logomarca: {
      responsiveImage: ResponsiveImageType,
    };
  }
  sectionsHeader: {
    aSection: [{
      title: string,
      link: string,
      id: string,
    }]
  }
}

export type HomeTypes = {
  home: {
    bgPhoto:  {
      responsiveImage: ResponsiveImageType,
    };
    job: string;
    name: string;
  }
}

export type Network = {
  network: {
    socialNetwork: [{
      id: string,
      networkName: string,
      link: string,
    }]
  }
}

export type Project = {
  project: {
    projectItem: {
      projectIcon: {
        responsiveImage: ResponsiveImageType,
      }
      id: string,
      projectName: string,
      projectLink: string,
    }
  }
}

export type Tab = {
  tab: {
    icon: {
      responsiveImage: ResponsiveImageType,
    }
    tabTitle: string
  }
}

export type QueryResponseType = {
  logo: {
    logomarca: {
      responsiveImage: ResponsiveImageType,
    };
  }
  sectionsHeader: {
    aSection: [{
      title: string,
      link: string,
      id: string,
    }]
  }
  home: {
    bgPhoto:  {
      responsiveImage: ResponsiveImageType,
    };
    job: string;
    name: string;
  }
  network: {
    socialNetwork: [{
      id: string,
      networkName: string,
      link: string,
    }]
  }
  project: {
    projectItem: {
      projectIcon: {
        responsiveImage: ResponsiveImageType,
      }
      id: string,
      projectName: string,
      projectLink: string,
    }
  }
  tab: {
    icon: {
      responsiveImage: ResponsiveImageType,
    }
    tabTitle: string
  }
};

export type QueryVariables = {
  first: number;
};