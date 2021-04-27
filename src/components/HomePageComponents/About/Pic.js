import React, { useContext } from 'react';
import styled from 'styled-components';

import { HomePageData } from '../../../containers/HomeContainer/index';

import { urlFor } from '../../../helpers/ImageUrlGetter';

const PicDiv = styled.div`
  margin: 2.25rem auto;
  width: ${(props) => props.width.desktop}%;

  @media (max-width: 768px) {
    width: ${(props) => props.width.mobile}%;
    max-width: 500px;
  }
`;

const IMG = styled.img`
  width: 100%;
`;

const Pic = () => {
  const {
    about: {
      pic,
      sizes: { picSizes },
    },
  } = useContext(HomePageData);

  return (
    <PicDiv width={picSizes}>
      <IMG
        src={urlFor(pic).auto('format').dpr(window.devicePixelRatio).url()}
        alt='about'
      />
    </PicDiv>
  );
};

export default Pic;
