import React from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import styled from 'styled-components';

const ContentDiv = styled.div`
  background: ${(props) => props.theme.bgBlack};

  padding: 2rem;

  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;

  -webkit-overflow-scrolling: touch;

  ${!isMobile &&
  `
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  `}

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
    width: 100vw;
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
    <ContentDiv className='content-div' safariMobile={isIOS} style={style}>
      {children}
    </ContentDiv>
  );
};

export default Content;
