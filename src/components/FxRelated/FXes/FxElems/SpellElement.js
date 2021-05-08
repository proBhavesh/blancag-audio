import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { SPELL } from '../../../../FxConstants';
import useFxPlayer from '../../../../helpers/useFxPlayer';

const SpellDiv = styled.div`
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 10000;

  --size: 40px;

  transform: translate(-50%, -50%);

  width: var(--size);
  height: var(--size);

  .circle {
    width: 100%;
    height: 100%;

    border-radius: 50%;
    background-color: #8e28cc;
    opacity: 0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;

    height: 100%;
    height: 100%;

    transform: translate(-50%, -50%);
    opacity: 0;
    transform-origin: center center;
  }

  &.play {
    .circle {
      animation: orb 1s linear;
    }
    svg {
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-timing-function: ease-in;
    }
  }

  ${createKeyframes()}
`;

function createKeyframes() {
  let styles = '';

  styles += `
    @keyframes orb {
      0% {
        opacity: 0;
        transform: scale(0);
        filter: blur(0);
      }
      20% {
        opacity: 1;
        transform: scale(2);
        filter: blur(20px);
      }
      100% {
        opacity: 0;
        transform: scale(3);
        filter: blur(50px);
      }
    }

    @keyframes brightEven {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(0) scale(0);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc) blur(0);
      }

      50% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(90deg) scale(1.5);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc) blur(0);
      }

      100% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(-90deg) scale(2.5);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc)
          blur(20px);
      }
    }

    @keyframes brightOdd {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(0) scale(0);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc) blur(0);
      }

      50% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(-90deg) scale(1.5);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc) blur(0);
      }

      100% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(90deg) scale(2.5);
        filter: drop-shadow(0 0 5px #408efc) drop-shadow(0 0 10px #408efc)
          blur(20px);
      }
    }
  `;

  return css`
    ${styles}
  `;
}

const SpellElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, SPELL);

  return (
    <SpellDiv
      ref={effectDivRef}
      onAnimationEnd={(e) => {
        e.elapsedTime !== 0 && effectDivRef.current.classList.remove('play');
      }}
    >
      <div className='circle'></div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 449.37 449.37'>
        <defs>
          <style>
            .a {'{'}
            fill: #fff;
            {'}'}
          </style>
        </defs>
        <path
          className='a'
          d='M449.37,251.61v-54l-175.06,21a52.9,52.9,0,0,0-12.23-23.49l94.56-74.27L328.29,92.54,253.63,187.6a52.57,52.57,0,0,0-25.49-9.71L249.51,0h-54l21.38,177.93a52.76,52.76,0,0,0-22.67,8L120.79,92.42,92.44,120.77l92.5,72.65a52.76,52.76,0,0,0-13.77,24.76L0,197.61v54l169.7-20.39a52.72,52.72,0,0,0,9.21,29.27L92.4,328.44l28.35,28.35,67.48-85.92a52.79,52.79,0,0,0,27.26,12.24l-20,166.26h54l-20-166.22a52.78,52.78,0,0,0,29.82-14.3l69,87.82,28.35-28.35-88.92-69.84a52.75,52.75,0,0,0,7.91-27.74Z'
        />
      </svg>
    </SpellDiv>
  );
};

export default React.memo(SpellElement);
