import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { GLITTER } from '../../../../FxConstants';
import useFxPlayer from '../../../../helpers/useFxPlayer';

const GlitterDiv = styled.div`
  --size: 10px;
  --hue: 0;
  --luminance: 50%;

  position: absolute;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);

  span {
    position: absolute;

    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    border-radius: 50%;
    background-color: #fff;
    opacity: 0;

    width: var(--size);
    height: var(--size);

    box-shadow: 0 0 5px hsl(var(--hue), 100%, var(--luminance)),
      0 0 10px hsl(var(--hue), 100%, var(--luminance)),
      0 0 30px hsl(var(--hue), 100%, var(--luminance));
  }

  &.play span {
    ${createAnimations()}
  }

  ${createKeyframes()}
`;

function createAnimations() {
  let styles = '';

  for (let i = 1; i <= 20; i++) {
    styles += `
    &:nth-of-type(${i}) {
      animation: glitter-anim${i} 0.5s ease-out;
    }
    `;
  }

  return css`
    ${styles}
  `;
}

function createKeyframes() {
  let styles = '';

  for (let i = 1; i <= 20; i++) {
    styles += `
      @keyframes glitter-anim${i} {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1);
        }

        25% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(var(--randomx${i}), var(--randomy${i})) scale(0.5);
        }
      }
    `;
  }

  return css`
    ${styles}
  `;
}

const GlitterElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, GLITTER);

  return (
    <GlitterDiv
      ref={effectDivRef}
      onAnimationEnd={() => effectDivRef.current.classList.remove('play')}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </GlitterDiv>
  );
};

export default GlitterElement;
