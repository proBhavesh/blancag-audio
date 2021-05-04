import React, { useContext } from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';

import { HomePageData } from '../../../containers/HomeContainer/index';

const HighlightDiv = styled.div`
  margin: 1.75rem auto 1rem;
  font-size: ${(props) => props.sizes.desktop}px;
  font-weight: bold;

  p {
    line-height: 1em;
  }

  text-shadow: 0 0 0.5em rgba(255, 255, 255, 0.75),
    0 0 0.25em rgba(255, 255, 255, 0.5);
  .highlight {
    color: ${(props) => props.theme.mainGreen};
    font-size: ${(props) => props.sizes.desktop * 1.1}px;
  }

  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobile}px;
    .highlight {
      font-size: ${(props) => props.sizes.mobile * 1.1}px;
    }
  }

  @media (max-width: 768px) and (orientation: landscape) {
    transform: scale(1.1);
  }
`;

const highlighted = (props) => {
  return <span className='highlight'>{props.children}</span>;
};

const Highlight = () => {
  const {
    about: {
      highlight,
      sizes: { highlightSizes },
    },
  } = useContext(HomePageData);

  return (
    <HighlightDiv sizes={highlightSizes}>
      <BlockContent
        blocks={highlight}
        serializers={{ marks: { highlight: highlighted } }}
      />
    </HighlightDiv>
  );
};

export default Highlight;
