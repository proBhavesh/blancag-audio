import React, { useEffect } from 'react';
import styled from 'styled-components';

import useScrollLock from '../../../../helpers/useScrollLock';

import FxWheel from './FxWheel';

const BackdropDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.bgBlack}40;
  transition: opacity 0.25s linear;
  z-index: 5000;

  display: grid;
  place-items: center;

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

const FxWheelIndex = ({ isOpen, setIsOpen }) => {
  const { stopScroll, resumeScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? stopScroll() : resumeScroll();
  }, [isOpen, stopScroll, resumeScroll]);

  return (
    <BackdropDiv isOpen={isOpen}>
      <FxWheel setIsOpen={setIsOpen} />
    </BackdropDiv>
  );
};

export default FxWheelIndex;
