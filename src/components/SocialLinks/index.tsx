import React from 'react';
import { FiLinkedin, FiInstagram, FiGithub } from 'react-icons/fi';
import Fade from 'react-reveal/Fade';

interface ISocialLinks {
  socialNetwork: [{
    id: string,
    networkName: string,
    link: string,
  }]
}

export const SocialLinks = ({ socialNetwork }: ISocialLinks) => {
  const icon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin':
        return <FiLinkedin />;
        break;
      case 'instagram':
        return <FiInstagram />;
        break;
      case 'github':
        return <FiGithub />;
        break;
      default:
        return null;
        break
    }

  }

  const socialItem = socialNetwork.map((network) =>
    <a
      key={network.id}
      className='
        text-2xl mb-5 
        hover:text-purple 
        transition-all ease-in-out duration-300
      '
      href={network.link}
      target="_blank"
      rel="noreferrer"
    >
      {icon(network.networkName)}
    </a>
  )
  return (
    <>
      <Fade left cascade>
        <span className='fixed flex flex-col left-10 bottom-4'>
          {socialItem}
        </span>
      </Fade>
    </>
  );
}