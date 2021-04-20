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
  }

  scrollbar-width: thin;
  scrollbar-color: transparent #bada55bf;
  overflow-x: hidden;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    appearance: none;
    width: 8px;

    @media (max-width: 768px) {
      width: 4px;
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
`;

const Content = ({ children }) => {
  return <ContentDiv className='content-div'>{children}</ContentDiv>;
};

export default Content;
