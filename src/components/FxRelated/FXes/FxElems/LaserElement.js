import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { LASER } from '../../../../FxConstants';
import useFxPlayer from '../../../../helpers/useFxPlayer';

const LaserDiv = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10000;

  --hue: 0;
  --size: 50px;
  --color: hsl(0, 100%, 50%);
  --angle: 0;

  /* transform: translate(-50%, -50%); */
  width: var(--size);
  height: var(--size);

  .circle {
    position: relative;
    border-radius: 50%;
    width: 100%;
    height: 100%;

    filter: drop-shadow(0 0 5px var(--color)) drop-shadow(0 0 10px var(--color))
      drop-shadow(0 0 20px var(--color));

    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='white' stroke-width='2' stroke-dasharray='5%2c 4%2c 2%2c 15%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");

    opacity: 0;

    .light {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;

      height: 25%;
      width: 25%;

      border-radius: 50%;
      background-color: white;

      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px white, 0 0 20px var(--color);
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;

      background-image: linear-gradient(to right, var(--color), transparent);

      height: 2px;
      width: 100%;

      transform-origin: 0% 0%;

      ${createSpans()}
    }
  }

  &.play {
    .circle {
      animation: scale-anim 0.4s ease-out;
    }

    .light {
      animation: scale-anim2 0.2s ease-out;
    }
  }

  ${createKeyframes()}
`;

function createSpans() {
  let styles = '';

  for (let i = 1; i <= 4; i++) {
    styles += `
      &:nth-child(${i}) {
        transform: rotate(calc(var(--angle) * ${i}deg))
        translatex(calc(var(--size) / 2));
      }
    `;
  }

  return css`
    ${styles}
  `;
}

function createKeyframes() {
  let styles = '';

  styles += `
    @keyframes scale-anim {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
      30% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.25);
      }

      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
    }

    @keyframes scale-anim2 {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(2);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
    }
  `;

  return css`
    ${styles}
  `;
}

const LaserElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, LASER);

  return (
    <LaserDiv
      ref={effectDivRef}
      onAnimationEnd={() => effectDivRef.current.classList.remove('play')}
    >
      <div className='circle'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className='light'></div>
      </div>
    </LaserDiv>
  );
};

export default LaserElement;
