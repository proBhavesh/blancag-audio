import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { EXPLOSION } from '../../../../FxConstants';
import useFxPlayer from '../../../../helpers/useFxPlayer';

const ExplosionDiv = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10000;

  --size: 50px;
  --angle: 0;
  --size1: 20px;
  --size2: 20px;
  --size3: 20px;
  --size4: 20px;

  transform: translate(-50%, -50%) rotate(calc(var(--angle) * 1deg));

  width: var(--size);
  height: var(--size);

  svg {
    width: 100%;
    height: 100%;
    opacity: 0;

    filter: drop-shadow(0 0 1px #fcae40) drop-shadow(0 0 2px #cc8e28)
      drop-shadow(0 0 3px #ff8985);
  }

  span {
    position: absolute;

    background-color: white;
    border-radius: 50%;
    border: 3px solid #ff8985;
    box-shadow: 0 0 10px #fcae40, 0 0 10px 2px #cc8e28, 0 0 25px 5px #ff8985;

    opacity: 0;

    ${createSizes()}

    &:nth-of-type(1) {
      top: 0;
      left: 0;
    }

    &:nth-of-type(2) {
      top: 0;
      right: 0;
    }

    &:nth-of-type(3) {
      bottom: 0;
      left: 0;
    }

    &:nth-of-type(4) {
      bottom: 0;
      right: 0;
    }
  }

  &.play {
    svg {
      animation: star-anim 1s ease-out;
    }
    span {
      ${createAnims()}
    }
  }

  ${createKeyframes()}
`;

function createSizes() {
  let styles = '';

  for (let i = 1; i <= 4; i++) {
    styles += `
      &:nth-of-type(${i}) {
        width: var(--size${i});
        height: var(--size${i});
      }
    `;
  }

  return css`
    ${styles}
  `;
}

function createAnims() {
  let styles = '';

  for (let i = 1; i <= 4; i++) {
    styles += `
      &:nth-of-type(${i}) {
        animation: span-anim${i} 0.4s ease-out;
        animation-delay: ${i * 0.1}s;
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
    @keyframes star-anim {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      20% {
        opacity: 1;
        transform: scale(2);
      }
      100% {
        opacity: 0;
        transform: scale(0);
      }
    }

    @keyframes span-anim1 {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(2) translate(-10%, -10%);
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(-10%, -10%);
      }
    }

    @keyframes span-anim2 {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(2) translate(10%, -10%);
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(10%, -10%);
      }
    }

    @keyframes span-anim3 {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(2) translate(10%, 10%);
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(10%, 10%);
      }
    }

    @keyframes span-anim4 {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(2) translate(-10%, 10%);
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(-10%, 10%);
      }
    }
  `;

  return css`
    ${styles}
  `;
}

const ExplosionElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, EXPLOSION);

  return (
    <ExplosionDiv
      ref={effectDivRef}
      onAnimationEnd={() => effectDivRef.current.classList.remove('play')}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 599 605'>
        <defs>
          <style>
            .a {'{'}
            fill: #fff; stroke: #fcae40; stroke-width: 1px;
            {'}'}
          </style>
        </defs>
        <path
          className='a'
          d='M301.5,462.5h0a150,150,0,0,0-150-150h0a150,150,0,0,0,150-150h0a150,150,0,0,0,150,150h0A150,150,0,0,0,301.5,462.5Z'
        />
        <polygon className='a' points='301 176 301.5 0 302 176 301 176' />
        <polygon className='a' points='176 313 0 312.5 176 312 176 313' />
        <polygon className='a' points='302 429 301.5 605 301 429 302 429' />
        <polygon className='a' points='423 312 599 312.5 423 313 423 312' />
      </svg>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </ExplosionDiv>
  );
};

export default ExplosionElement;
