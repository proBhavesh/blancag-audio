import React, { useEffect } from 'react';
import styled from 'styled-components';

import useScrollLock from '../helpers/useScrollLock';

const BackdropDiv = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  right: 0;
  width: 100%;
  height: 100%;

  background-color: #00000040;
  transition: opacity 0.5s linear;
  z-index: 5000;

  ${(props) =>
    !props.isOpen
      ? `
    opacity:0;
    pointer-events: none;
  `
      : `
    opacity: 1;
    pointer-events: initial;
  `}
`;

const BackDrop = ({ isOpen, setIsOpen }) => {
  const { top, stopScroll, resumeScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? stopScroll() : resumeScroll();
  }, [isOpen, stopScroll, resumeScroll]);

  return (
    <BackdropDiv isOpen={isOpen} top={top}>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </BackdropDiv>
  );
};

export default BackDrop;
