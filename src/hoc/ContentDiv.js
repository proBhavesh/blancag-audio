import React from 'react';
import styled from 'styled-components';

const ContentDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 2rem 1.25rem;

    scrollbar-width: thin;
    scrollbar-color: transparent #bada55bf;

    &::-webkit-scrollbar {
      appearance: none;
      width: 4px;
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

  overflow-x: hidden;
  overflow-y: overlay;

  -webkit-overflow-scrolling: touch;
`;

const Content = ({ hideScroll, children }) => {
  return (
    <ContentDiv hideScroll={hideScroll} className='content-div'>
      {children}
    </ContentDiv>
  );
};

export default Content;
