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
        return <FiLinkedin aria-hidden='true' />;
        break;
      case 'instagram':
        return <FiInstagram aria-hidden='true' />;
        break;
      case 'github':
        return <FiGithub aria-hidden='true' />;
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
        text-xl sm:text-2xl mb-5 ml-3 sm:ml-0 
        hover:text-purple 
        transition-all ease-in-out duration-300 sm:text-foreground text-foreground-500
      '
      href={network.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Acesse meu perfil no ${network.networkName}`}
      role="button"
    >
      {icon(network.networkName)}
    </a>
  )
  return (
    <>
      <Fade left cascade>
        <span className='fixed flex flex-row sm:flex-col z-10 bottom-0 sm:left-10 sm:bottom-4'>
          {socialItem}
        </span>
      </Fade>
    </>
  );
}