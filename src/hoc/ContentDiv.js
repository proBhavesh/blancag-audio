import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { pageVariant } from '../styles/motionVariants/pageVariant';

const ContentDiv = styled(motion.div)`
  background: ${(props) => props.theme.bgBlack};

  padding: 2rem;

  position: relative;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  overflow-x: hidden;
  overflow-y: scroll;

  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
    overflow-y: auto;
    height: auto;
  }

  scrollbar-width: thin;
  scrollbar-color: transparent ${(props) => props.theme.mainGreen}bf;

  &::-webkit-scrollbar {
    appearance: none;
    width: 8px;

    @media (max-width: 768px) {
      width: 4px;
    }

    &::-webkit-scrollbar:horizontal {
      display: none;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 2rem;
    border: 1px solid ${(props) => props.theme.lighterGrey}80;
    z-index: 10000;
  }
`;

const Content = ({ style, children }) => {
  return (
    <ContentDiv
      className='content-div'
      style={style}
      // motion:
      variants={pageVariant}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      {children}
    </ContentDiv>
  );
};

export default Content;
