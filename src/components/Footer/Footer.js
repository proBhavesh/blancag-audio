import React, { useContext } from 'react';
import styled from 'styled-components';

import { FooterContext } from '../../context/FooterContext';

import SocialLink from './SocialLink';

const FooterDiv = styled.div`
  margin: 2rem auto 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  const {
    links: { linkedIn, vimeo, youtube, soundCloud },
  } = useContext(FooterContext);
  const links = {
    linkedIn,
    vimeo,
    youtube,
    soundCloud,
  };
  const linksArray = Object.keys(links);

  return (
    <>
      <FooterDiv>
        {linksArray.map((link, i) => (
          <SocialLink key={i} url={links[link]} type={link} />
        ))}
      </FooterDiv>
    </>
  );
};

export default Footer;
