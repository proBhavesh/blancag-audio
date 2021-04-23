import React from 'react';
import { isMobile, isSafari } from 'react-device-detect';
import styled from 'styled-components';

const ContentDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  padding: 2rem;

  overflow-x: hidden;
  overflow-y: overlay;

  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
    ${(props) => props.safariMobile && `height: auto; width: 100%`};

    scrollbar-width: thin;
    scrollbar-color: transparent #bada55bf;

    &::-webkit-scrollbar {
      appearance: none;
      width: 4px;

      &::-webkit-scrollbar:horizontal {
        display: none;
      }
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.bgBlack}80;
      border-radius: 2rem;
      border: 1px solid ${(props) => props.theme.lighterGrey}80;
      z-index: 10000;
    }
  }

  @media (min-width: 768px) {
    ${(props) =>
      !props.hideScroll
        ? `
    scrollbar-width: thin;
    scrollbar-color: transparent #bada55bf;

    &::-webkit-scrollbar {
      appearance: none;
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.bgBlack}80;
      border-radius: 2rem;
      border: 1px solid ${(props) => props.theme.lighterGrey}80;
      z-index: 10000;
    }
  `
        : `
    scrollbar-color: transparent transparent;

     &::-webkit-scrollbar {
      appearance: none;
      display: none;
    }
  `}
  }
`;

const Content = ({ hideScroll, style, children }) => {
  return (
    <ContentDiv
      hideScroll={hideScroll}
      className='content-div'
      safariMobile={isMobile && isSafari}
      style={style}
    >
      {children}
    </ContentDiv>
  );
};

export default Content;
