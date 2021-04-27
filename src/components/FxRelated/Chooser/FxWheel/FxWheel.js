import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import * as FXes from '../../../../FxConstants';
import { FxContext } from '../../../../context/FxContext';

import EnergyBallBtn from './Buttons/EnergyBallBtn';
import GlitterBtn from './Buttons/GlitterBtn';
import ExplosionBtn from './Buttons/ExplosionBtn';
import SpellBtn from './Buttons/SpellBtn';
import SwordBtn from './Buttons/SwordBtn';
import LaserBtn from './Buttons/LaserBtn';

const MainChooser = styled.div`
  --d: ${(props) => props.size.desktop}px; /* image size */
  @media (max-width: 768px) {
    --d: ${(props) => props.size.mobile}px;
  }
  --rel: 0.5; /* how much extra space we want between images, 1 = one image size */
  --tan: ${(props) => props.tan};
  --r: calc(0.5 * (1 + var(--rel)) * var(--d) / var(--tan)); /* circle radius */
  --s: calc(2 * var(--r) + var(--d)); /* container size */
  position: relative;
  width: var(--s);
  height: var(--s);

  border-radius: 50%;
  display: grid;
  place-items: center;

  button {
    padding: 0;
    outline: none;

    position: absolute;
    top: 50%;
    left: 50%;
    margin: calc(-0.5 * var(--d));
    width: var(--d);
    height: var(--d);

    background-color: black;

    ${createCSS()};

    border-radius: 50%;
    border: 2px solid white;

    display: grid;
    place-items: center;

    transition: border-color 0.3s;
    svg {
      width: 50%;
      fill: #fff;
      transition: fill 0.3s;
    }

    @media (min-width: 769px) {
      cursor: pointer;
      &:hover:not(.close) {
        border-color: #bada55;
        svg {
          fill: #bada55;
        }
      }
    }

    &.apply {
      border-color: #bada55;
      svg {
        fill: #bada55;
      }
    }
  }
`;

const CloseButton = styled.button`
  border: none !important;
  background-color: transparent !important;

  svg {
    width: 30% !important;

    &:hover {
      cursor: pointer;
      fill: ${(props) => props.theme.mainGreen};
    }
  }
`;

function createCSS() {
  let styles = '';

  for (let i = 2; i <= 7; i++) {
    styles += `
       &:nth-of-type(${i}):not(.close) {
        --az${i}: calc((${i} - 1) * 360deg / 6);
        transform: rotate(var(--az${i}))
          translate(var(--r))
          rotate(calc(-1 * var(--az${i})));
      }
     `;
  }

  return css`
    ${styles}
  `;
}

const NoEffectDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 45%;
  height: 45%;

  border-radius: 50%;
`;

const FxWheel = ({ setIsOpen, sizes }) => {
  const {
    sizes: {
      chooser: {
        WheelBtns: { desktop, mobile },
      },
    },
  } = useContext(FxContext);

  const tan = Math.tan(Math.PI / 6);

  return (
    <MainChooser className='wheel-wrapper' size={{ desktop, mobile }} tan={tan}>
      <NoEffectDiv className='fx-wheel-no-fx' />
      <CloseButton className='close'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 14 14'
          onClick={() => setIsOpen(false)}
        >
          <path d='M8.41,7l5.3-5.29A1,1,0,1,0,12.29.29L7,5.59,1.71.29A1,1,0,0,0,.29,1.71L5.59,7,.29,12.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L7,8.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z' />
        </svg>
      </CloseButton>
      <EnergyBallBtn id={FXes.ENERGY_BALL} />
      <GlitterBtn id={FXes.GLITTER} />
      <ExplosionBtn id={FXes.EXPLOSION} />
      <SpellBtn id={FXes.SPELL} />
      <SwordBtn id={FXes.SWORD} />
      <LaserBtn id={FXes.LASER} />
    </MainChooser>
  );
};

export default FxWheel;
