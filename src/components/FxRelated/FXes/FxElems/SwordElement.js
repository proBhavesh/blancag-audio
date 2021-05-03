import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { SWORD } from '../../../../FxConstants';
import useFxPlayer from '../../../../helpers/useFxPlayer';

const SpellDiv = styled.div`
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 10000;

  --size: 100px;

  width: var(--size);
  height: var(--size);

  border-right: 10px solid white;

  border-radius: 50%;

  filter: drop-shadow(0 0 5px #87bfff) drop-shadow(0 0 15px #87bfff)
    drop-shadow(0 0 10px rgba(135, 191, 255, 0.5))
    drop-shadow(0 0 20px rgba(135, 191, 255, 0.25));

  transform-origin: center;

  opacity: 0;

  &.play {
    animation: slash 250ms ease-out;
  }

  ${createKeyframes()}
`;

function createKeyframes() {
  let styles = '';

  styles += `
  @keyframes slash {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0) rotate(-195deg);
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1) rotate(75deg);
    }
  }
  `;

  return css`
    ${styles}
  `;
}

const SpellElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, SWORD);

  return (
    <SpellDiv
      ref={effectDivRef}
      onAnimationEnd={() => effectDivRef.current.classList.remove('play')}
    ></SpellDiv>
  );
};

export default SpellElement;
