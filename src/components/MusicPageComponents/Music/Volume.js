import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { IconDiv } from './IconDiv';

import { MusicPageData } from '../../../containers/MusicContainer/index';

const VolumeDiv = styled.div`
  grid-column: span 2;
  justify-self: flex-end;

  width: 70%;

  display: flex;
  align-items: center;
`;

const VolumeBarDiv = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;

  &:hover {
    input::-webkit-slider-thumb {
      opacity: 1;
    }
    input::-moz-range-thumb {
      opacity: 1;
    }
  }
`;

const VolumeBar = styled.input`
  appearance: none;
  pointer-events: none;

  position: relative;
  height: 0.2rem;
  width: 100%;
  border-radius: 1rem;

  border: none;
  outline: none;

  margin-left: 0.5rem;
  background-color: #a6a6a680;
  z-index: 2;

  &::-webkit-slider-thumb {
    appearance: none;
    opacity: 0;
    cursor: pointer;
    pointer-events: auto;

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
    pointer-events: auto;
    opacity: 0;

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
`;

const VolumeIcon = styled(IconDiv)`
  height: ${(props) => props.sizes.desktopIcon}px;
  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon}px;
  }
`;

const Volume = () => {
  const {
    volume,
    setVolume,
    sizes: {
      mainPlayer: {
        icons: { desktop: desktopIcon, mobile: mobileIcon },
      },
    },
  } = useContext(MusicPageData);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volume !== 0 && (() => (volumeRef.current = volume))();
  }, [volume]);

  let volumeSVG;
  if (volume >= 0.75) {
    volumeSVG = (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 77.69'>
        <path
          d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Zm10,20.5a2.83,2.83,0,0,0-.87,3.91h0a26.72,26.72,0,0,1,.11,28.55,2.83,2.83,0,1,0,4.8,3A32.38,32.38,0,0,0,67,21.64,2.83,2.83,0,0,0,63.13,20.75ZM86.85,1.41a2.83,2.83,0,1,0-4.43,3.53h0a54.69,54.69,0,0,1,.14,68,2.83,2.83,0,1,0,4.21,3.79l.23-.3A60.35,60.35,0,0,0,86.85,1.41Zm-9.54,9.68a2.83,2.83,0,1,0-4.55,3.37,41.26,41.26,0,0,1,.13,48.92,2.83,2.83,0,0,0,4.48,3.46l.08-.11A46.93,46.93,0,0,0,77.31,11.09Z'
          transform='translate(0 0)'
        />
      </svg>
    );
  } else if (volume >= 0.25 && volume < 0.75) {
    volumeSVG = (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 77.69'>
        <path
          d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Z'
          transform='translate(0 0)'
        />
        <path
          d='M63.13,20.75a2.83,2.83,0,0,0-.87,3.91h0a26.72,26.72,0,0,1,.11,28.55,2.83,2.83,0,1,0,4.8,3A32.38,32.38,0,0,0,67,21.64,2.83,2.83,0,0,0,63.13,20.75Z'
          transform='translate(0 0)'
        />
        <path
          d='M77.31,11.09a2.83,2.83,0,1,0-4.55,3.37,41.26,41.26,0,0,1,.13,48.92,2.83,2.83,0,0,0,4.48,3.46l.08-.11A46.93,46.93,0,0,0,77.31,11.09Z'
          transform='translate(0 0)'
        />
      </svg>
    );
  } else if (volume > 0 && volume < 0.25) {
    volumeSVG = (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 77.69'>
        <path
          d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Z'
          transform='translate(0 0)'
        />
        <path
          d='M63.13,20.75a2.83,2.83,0,0,0-.87,3.91h0a26.72,26.72,0,0,1,.11,28.55,2.83,2.83,0,1,0,4.8,3A32.38,32.38,0,0,0,67,21.64,2.83,2.83,0,0,0,63.13,20.75Z'
          transform='translate(0 0)'
        />
      </svg>
    );
  } else if (volume === 0) {
    volumeSVG = (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 77.69'>
        <path
          d='M53.13.25a2.83,2.83,0,0,0-3,.43L25.66,21.85H2.83A2.83,2.83,0,0,0,0,24.65V52.74a2.83,2.83,0,0,0,2.83,2.83H25.3L50.1,77a2.83,2.83,0,0,0,4.68-2.17v-72A2.83,2.83,0,0,0,53.13.25Z'
          transform='translate(0 0)'
        />
        <path
          d='M94.5,20.26a4,4,0,0,0-5.64.17L77.14,32.84,66,19.8a4,4,0,0,0-6.23,5L60,25,71.66,38.67l-12.34,13a4,4,0,1,0,5.8,5.48L76.84,44.75,88,57.75a4,4,0,1,0,6.26-4.94L94,52.57h0L82.35,39,94.69,26a4,4,0,0,0-.12-5.64h0Z'
          transform='translate(0 0)'
        />
      </svg>
    );
  }

  return (
    <VolumeDiv>
      <VolumeIcon
        onClick={() =>
          setVolume((prev) => (prev === 0 ? volumeRef.current : 0))
        }
        sizes={{ desktopIcon, mobileIcon }}
      >
        {volumeSVG}
      </VolumeIcon>
      <VolumeBarDiv>
        <VolumeBar
          type='range'
          min='0'
          max='1'
          step='0.05'
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
      </VolumeBarDiv>
    </VolumeDiv>
  );
};

export default Volume;
