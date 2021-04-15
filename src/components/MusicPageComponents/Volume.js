import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import { IconDiv } from './IconDiv';

import { MusicPageData } from '../../containers/MusicContainer/index';

const VolumeDiv = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    &:hover {
      .bar {
        display: initial;
      }
    }
  }

  @media (max-width: 768px) {
    grid-area: volume;

    position: relative;

    &.active {
      align-self: flex-end;

      .bar {
        display: initial;
      }
    }
  }
`;

const VolumeBar = styled.input`
  appearance: none;
  display: none;

  position: relative;
  height: 0.2rem;
  width: 100%;
  border-radius: 1rem;

  border: none;
  outline: none;

  margin-left: 1rem;
  background-color: #a6a6a680;
  z-index: 2;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;

    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #a6a6a6;

    z-index: 5;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }
  }

  &::-moz-range-thumb {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #a6a6a6;

    z-index: 5;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${(props) => props.value * 100}%;
    height: 100%;

    border-radius: 1rem;

    background-color: #bada55;
    z-index: -1;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: -2rem;
    left: 50%;
    margin-left: 0;
    width: 200%;

    transform-origin: center;
    transform: translatex(-50%) rotate(-90deg);

    &::-webkit-slider-thumb {
      width: 0.5rem;
      height: 0.5rem;
    }

    &::-moz-range-thumb {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
`;

const Volume = ({ audioRef }) => {
  const { volume, setVolume } = useContext(MusicPageData);
  const volumeDivRef = useRef(null);

  return (
    <VolumeDiv
      ref={volumeDivRef}
      onClick={(e) => volumeDivRef.current.classList.toggle('active')}
    >
      <IconDiv id='volume'>
        {!(volume === 0) ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 77.71'>
            <path d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Zm10,20.5a2.83,2.83,0,0,0-.87,3.91h0a26.72,26.72,0,0,1,.11,28.55,2.83,2.83,0,1,0,4.8,3A32.38,32.38,0,0,0,67,21.64a2.83,2.83,0,0,0-3.87-.89ZM86.85,1.41a2.83,2.83,0,1,0-4.43,3.53h0a54.69,54.69,0,0,1,.14,68,2.83,2.83,0,1,0,4.21,3.79l.23-.3A60.35,60.35,0,0,0,86.85,1.41Zm-9.54,9.68a2.83,2.83,0,1,0-4.55,3.37,41.26,41.26,0,0,1,.13,48.92,2.83,2.83,0,0,0,4.48,3.46l.08-.11A46.93,46.93,0,0,0,77.31,11.09Z' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90.57 77.71'>
            <path d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Z' />
            <path d='M89.66,25.32a2.91,2.91,0,0,0-4.11.12L77,34.51,68.89,25a2.91,2.91,0,1,0-4.42,3.78L73,38.76l-9,9.52a2.91,2.91,0,1,0,4.23,4l8.55-9.07,8.11,9.47a2.9,2.9,0,0,0,4.41-3.78L80.8,39l9-9.52A2.91,2.91,0,0,0,89.66,25.32Z' />
          </svg>
        )}
      </IconDiv>
      <VolumeBar
        type='range'
        min='0'
        max='1'
        step='0.05'
        value={volume}
        onChange={(e) => {
          setVolume(+e.target.value);
          audioRef.volume = +e.target.value;
        }}
        className='bar'
      />
    </VolumeDiv>
  );
};

export default Volume;
