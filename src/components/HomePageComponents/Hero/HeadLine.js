import React, { useContext } from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';

import { HomePageData } from '../../../containers/HomeContainer/index';

const HeadLineDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;

  h1 {
    font-weight: normal;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
    font-size: ${(props) => props.sizes.desktop}px;
    font-family: 'Arial', 'Helvetica', sans-serif;
    letter-spacing: 0.25em;
    line-height: 1.5em;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobile}px;
    }
  }
`;

const HeadLine = () => {
  const {
    hero: { headLine, headLineFontSizes },
  } = useContext(HomePageData);

  return (
    <HeadLineDiv sizes={headLineFontSizes}>
      <BlockContent blocks={headLine} />
    </HeadLineDiv>
  );
};

export default HeadLine;
