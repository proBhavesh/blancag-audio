import React, { useContext } from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';

import { HomePageData } from '../../../containers/HomeContainer/index';

const ContentDiv = styled.div`
  margin: 1.75rem auto;

  p {
    margin: 0 auto 1.25em;
    width: 100%;
    max-width: 550px;

    font-size: ${(props) => props.sizes.desktop}px;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobile}px;
      width: ${(props) => props.width}%;
    }
  }
`;

const Content = () => {
  const {
    about: {
      content,
      sizes: { paraWidth, contentSizes },
    },
  } = useContext(HomePageData);

  return (
    <ContentDiv width={paraWidth} sizes={contentSizes}>
      <BlockContent blocks={content} />
    </ContentDiv>
  );
};

export default Content;
