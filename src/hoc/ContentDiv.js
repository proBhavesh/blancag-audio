import React from 'react';
import { isIOS } from 'react-device-detect';
import styled from 'styled-components';

const ContentDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  background: ${(props) => props.theme.bgBlack};

  padding: 2rem;

  overflow-x: hidden;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
    ${(props) => props.safariMobile && `height: auto; width: 100%`};
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
