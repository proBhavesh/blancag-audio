import React, { useContext } from 'react';
import styled from 'styled-components';

import { NavBarContext } from '../../context/NavbarContext';

import { urlFor } from '../../helpers/ImageUrlGetter';

const LogoDiv = styled.div`
  width: ${(props) => props.textLogoSizes.desktop}%;
  margin: 0 auto 1.5rem;

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 481px) {
    width: ${(props) => props.textLogoSizes.mobile}%;
    margin: 0 auto 1rem;
  }

  img {
    width: 100%;
  }
`;

const Logo = () => {
  const { textLogo, textLogoSizes } = useContext(NavBarContext);

  return (
    <LogoDiv textLogoSizes={textLogoSizes}>
      <img
        src={urlFor(textLogo).auto('format').dpr(window.devicePixelRatio).url()}
        alt='Logo'
      />
    </LogoDiv>
  );
};

export default React.memo(Logo);
