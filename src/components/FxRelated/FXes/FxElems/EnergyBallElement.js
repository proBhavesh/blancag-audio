import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import useFxPlayer from '../../../../helpers/useFxPlayer';
import { ENERGY_BALL } from '../../../../FxConstants';

const EnergyBallDiv = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10000;
  --size: 40px;

  transform: translate(-50%, -50%);

  width: var(--size);
  height: var(--size);
  opacity: 0;
  transition: opacity 0.1s;

  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px #2667ff, 0 0 10px #2667ff, 0 0 15px #2667ff,
    0 0 20px #2667ff, 0 0 25px #2667ff;

  svg {
    position: absolute;
    opacity: 0;
    left: calc(var(--size) / -3);

    width: 150%;
    filter: drop-shadow(0 0 5px #2667ff) drop-shadow(0 0 10px #3f8efc);

    &.Lightning1 {
      top: 65%;
    }

    &.Lightning2 {
      top: -40%;
      width: 175%;
      left: calc(var(--size) / -3);
    }
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: 50%;
    z-index: -1;
    opacity: 0;
  }

  &:before {
    border: 1px solid rgba(#2667ff, 0.5);
  }

  &:after {
    background-image: radial-gradient(transparent 50%, rgba(#2667ff, 0.5));
    z-index: -1;
  }

  &.play {
    opacity: 1;
    animation: random-move 0.6s linear;

    svg {
      &.Lightning1 {
        animation: lightning1 0.3s linear;
      }
      &.Lightning2 {
        animation: lightning2 0.3s linear 0.15s;
      }
    }

    &:after {
      animation: outer-circle 0.45s linear;
    }
    &:before {
      animation: outer-ring 0.45s linear;
    }
  }

  ${createKeyframes()}
`;

function createKeyframes() {
  let styles = '';

  styles += `
    @keyframes outer-ring {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      75% {
        opacity: 1;
        transform: scale(2.5);
      }
      100% {
        opacity: 0;
        transform: scale(2.5);
      }
    }

    @keyframes outer-circle {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(2.5);
      }
      100% {
        opacity: 0;
        transform: scale(2.5);
      }
    }

    @keyframes random-move {
      0% {
        transform: translate(-50%, -50%);
      }

      25% {
        transform: translate(-45%, -50%);
      }

      50% {
        transform: translate(-48%, -40%);
      }

      75% {
        transform: translate(-65%, -65%);
      }

      100% {
        transform: translate(-50%, -50%);
      }
    }

    @keyframes lightning1 {
      0% {
        opacity: 0;
        transform: translate(-100%, 0) scale(0);
      }
      25% {
        transform: translate(15%, -15%) scale(1);
      }
      50% {
        opacity: 1;
        transform: translate(5%, -25%) scale(1);
      }
      75% {
        transform: translate(-15%, -35%) scale(0.25);
      }
      100% {
        opacity: 0;
        transform: translate(0) scale(0);
      }
    }

    @keyframes lightning2 {
      0% {
        opacity: 0;
        transform: translate(100%, 0) scale(0);
      }
      25% {
        transform: translate(-15%, -15%) scale(1);
      }
      50% {
        opacity: 1;
        transform: translate(-5%, -25%) scale(1);
      }
      75% {
        transform: translate(15%, -35%) scale(0.25);
      }
      100% {
        opacity: 0;
        transform: translate(0) scale(0);
      }
    }
  `;

  return css`
    ${styles}
  `;
}

const EnergyBallElement = () => {
  const effectDivRef = useRef(null);

  useFxPlayer(effectDivRef, ENERGY_BALL);

  return (
    <EnergyBallDiv
      ref={effectDivRef}
      onAnimationEnd={() => effectDivRef.current.classList.remove('play')}
    >
      <svg
        className='Lightning1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 541.41 296.15'
      >
        <defs>
          <style>
            .a {'{'}
            fill: #fff;
            {'}'}
          </style>
        </defs>
        <title>Lightning1_1</title>
        <path
          className='a'
          d='M65.8,46q-9.72-4-19.41-8.13C39.93,35.14,33.46,32.43,27,29.65l2.27-.6L17.92,46.5c-3.8,5.8-7.55,11.64-11.4,17.42l.32-3.29,25.6,52.27L29,110.05l31.19,6.7,31.17,6.8,7,1.53-2.29,7.08-9.42,29.2-9.47,29.18-3-9,30.32,20,30.26,20.12-4-1.49q23.53,2.17,47,4.52L201.31,227l23.52,2.36,1.92.19,1.78,1,41.11,22.8,41,22.93-8.89-.44,66-28.92-5.11,13-17.79-42.09-4.27-10.12,10.46-3c5.23-1.48,10.42-2.92,15.66-4.35l7.9-2.08c2.67-.68,5.29-1.34,8.21-2l.54-.12.64-.13,1.29-.24c.41-.06.91-.12,1.37-.16l.69,0,.35,0H388l1.71.14.8.09.52.06,1,.14,2.07.28,8,1.15,16,2.36c10.66,1.58,21.29,3.26,31.93,4.9l31.9,5-9,5.2,10.84-26.43,5.33-13.24c1.77-4.4,3.53-8.82,5.2-13.18l1.22-3.25.56-1.56.24-.71.17-.53,0-.09v0s0,0,0,.07l0,.14a5.23,5.23,0,0,0-.06.57v.7a6.9,6.9,0,0,0,.2,1.2l0,.05-.18-.48-.29-.66c-.42-.93-.89-1.94-1.41-3-2.05-4.09-4.3-8.27-6.56-12.42-4.53-8.32-9.18-16.64-13.86-24.9l-1.86-3.27,1.76-3,19.84-33.52.37-.63.32-.34C501.4,69.62,508,62.83,514.51,56l19.65-20.42-.22,4.51c-3.19-4.61-6.41-9.19-9.56-13.82l-9.5-13.88,1.46.93c-9.26-2.2-18.54-4.33-27.79-6.58S470,2.32,460.8,0c9.43,1.35,18.84,2.82,28.25,4.23s18.81,2.95,28.21,4.42l.83.13.64.8,10.5,13.12c3.51,4.37,6.95,8.79,10.43,13.18l1.75,2.2-2,2.31L521.09,62c-6.12,7.2-12.22,14.41-18.39,21.56l.69-1L485.24,117l-.1-6.24c5.11,8.13,10.15,16.24,15.11,24.49,2.46,4.14,4.9,8.26,7.3,12.62.6,1.09,1.19,2.21,1.8,3.43l.46,1,.51,1.18.31.89a9.8,9.8,0,0,1,.4,2.07,4.86,4.86,0,0,1,0,.64l0,.5c0,.34-.07.68-.12,1l-.08.43,0,.17-.09.34-.16.68-.15.51-.29,1-.58,1.83-1.16,3.51c-3.12,9.19-6.41,18.14-9.73,27.13l-10.05,26.87-2.27,6.07-6.7-.87-64-8.34-16-2.07-7.94-1-3.59-.41-.29-.05h.27a2,2,0,0,0,.37,0l-.69.15-.36.07-.44.11c-2.32.55-4.91,1.25-7.44,1.95l-7.67,2.15c-5.12,1.46-10.28,3-15.38,4.46l6.18-13.08,18.22,41.9,3.9,9-9,4-66,29.08-4.56,2-4.34-2.45-41-23.07-40.89-23.2,3.71,1.18L199.29,246l-23.47-2.71q-23.49-2.69-46.95-5.48l-2.33-.28-1.72-1.21L95.08,215.41l-29.68-21-5-3.51,2-5.47L73,156.64l10.58-28.8,4.71,8.61-30.83-8.2L26.61,120l-2.54-.68-.91-2.17L.77,63.37,0,61.53l1.08-1.45c4.16-5.56,8.4-11,12.6-16.58L26.31,27l1-1.27,1.3.67c6.23,3.22,12.43,6.51,18.63,9.78S59.62,42.68,65.8,46Z'
        />
      </svg>
      <svg
        className='Lightning2'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 445.01 193.01'
      >
        <defs>
          <style>
            .a {'{'}
            fill: #fff;
            {'}'}
          </style>
        </defs>
        <title>Lightning2</title>
        <path
          className='a'
          d='M34.76,193c-5.65-5.55-11.24-11.15-16.84-16.74l-8.39-8.39-8.34-8.44L0,158.24l1.07-1.52,15.17-21.63,15.32-21.51,1.66-2.33,3,1,32.38,11-6.34,2.46L75.46,97.81,88.81,70l4.94-10.31,6.6,9.7L120.48,99l10,14.82,10,14.84-14.12,1.12L136,107.07l9.71-22.63L145,88l-.28-21.5L144.49,45V44l.26-1.13,7.69-34.08,2-8.81,9,1.58,36,6.3,18,3.15,18,3.21,10.55,1.89-2.72,10.4L235.9,55.05l-7.5,28.5-5.5-11.61,46,21.11-13.11,5c8.46-18.94,16.84-37.92,25.37-56.83l2.37-5.28,5.59-.35,41-2.61,41-2.47,17.27-1-9.49,14.15-30.15,45L350,84.08l1.48,44.57-6.68-6.34,34.57.92-2.66.63,27.08-12.81,27.15-12.68L436,96l.8,5.26,4.12,27.16,3.94,27.2.18,1.28-.88.7c-4.84,3.8-9.63,7.65-14.5,11.42l-.28.22-.21.05c-9.13,2.24-18.24,4.54-27.38,6.71,8.85-3.16,17.74-6.2,26.61-9.29l-.49.27c4.47-4.23,9-8.38,13.51-12.58l-.7,2-6.06-26.8-5.88-26.84,5.85,2.9-26.28,14.4L382,134.33l-1.11.6-1.56,0-34.57.75-6.19.13-.48-6.47L334.74,84.9l-.18-2.33L336,80.35l28.65-46,7.78,13.12-41,3.54-41,3.39,8-5.63C290.27,67.89,282,86.91,273.77,106l-3.94,9.16L260.67,111,214.62,90.08,207,86.61l2.14-8.14L216.61,50l7.55-28.49L232,33.77l-18-3.28-18-3.35-36-6.7,11-7.24-8.31,33.93L163,45l-.2,21.5L162.54,88l0,2-.73,1.58L151.49,114l-10.37,22.33-6.31,13.59L127,137.4l-9.5-15.16L108,107.05,89.16,76.65,100.7,76,86.05,103.2,71.3,130.32l-2.25,4.15L65,132.79l-31.62-13,4.6-1.33L21.27,138.92,4.45,159.3l-.13-2.72L12,165.64l7.61,9.1C24.66,180.82,29.74,186.89,34.76,193Z'
        />
      </svg>
    </EnergyBallDiv>
  );
};

export default EnergyBallElement;
