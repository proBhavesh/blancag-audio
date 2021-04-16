import React from 'react';
import styled from 'styled-components';

import { IconDiv } from './IconDiv';

const PlayControlsDiv = styled.div`
  grid-column: span 2;
  justify-self: center;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    grid-area: controls;
    justify-self: center;
  }
`;

const PrevBtn = styled(IconDiv)`
  margin-right: 2.25rem;
`;

const PlayPauseBtn = styled(IconDiv)`
  margin-right: 2.25rem;

  &.play-btn {
    width: 2.5rem;
    height: 2.5rem;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  &.pause-btn {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding-top: 2px;

    svg {
      height: 1rem;
      fill: #000;
    }

    &:hover {
      background-color: #bada55;

      svg {
        fill: #000;
      }
    }
  }
`;

const NextBtn = styled(IconDiv)``;

const PlayControls = ({ playing, pauseAudio, playAudio, changeSong }) => {
  return (
    <PlayControlsDiv>
      <PrevBtn onClick={() => changeSong(false)}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
          <path d='M36.09,34.14V1.78a1,1,0,0,0-1-1,1,1,0,0,0-.53.15L8.07,17.1a1,1,0,0,0,0,1.71L34.57,35a1,1,0,0,0,1.37-.33A1,1,0,0,0,36.09,34.14Z' />
          <rect width='7.67' height='35.92' rx='1' />
        </svg>
      </PrevBtn>
      <PlayPauseBtn
        className={playing ? 'pause-btn' : 'play-btn'}
        onClick={() => (playing ? pauseAudio() : playAudio())}
      >
        {!playing ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 90'>
            <path d='M45,0A45,45,0,1,0,90,45,44.94,44.94,0,0,0,45,0ZM33.7,64V26L63.9,45Z' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 536 606'>
            <rect x='359' width='177' height='606' />
            <rect width='177' height='606' />
          </svg>
        )}
      </PlayPauseBtn>
      <NextBtn onClick={changeSong}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
          <path d='M0,1.78V34.14a1,1,0,0,0,1,1A1,1,0,0,0,1.52,35L28,18.82a1,1,0,0,0,0-1.71L1.52.93a1,1,0,0,0-1.37.33A1,1,0,0,0,0,1.78Z' />
          <rect x='28.42' width='7.67' height='35.92' rx='1' />
        </svg>
      </NextBtn>
    </PlayControlsDiv>
  );
};

export default PlayControls;
