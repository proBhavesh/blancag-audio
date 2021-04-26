import React, { useContext } from 'react';
import styled from 'styled-components';

import { IconDiv } from './IconDiv';

import { MusicPageData } from '../../../containers/MusicContainer/index';

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
  margin-right: 2rem;
  height: ${(props) => props.sizes.desktopIcon}px;

  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon * 1.5}px;
  }
`;

const PlayPauseBtn = styled(IconDiv)`
  margin-right: 2rem;

  &.play-ctrl-btn {
    width: ${(props) => props.sizes.desktopIcon * 2.5}px;
    height: ${(props) => props.sizes.desktopIcon * 2.5}px;
    @media (max-width: 768px) {
      width: ${(props) => props.sizes.mobileIcon * 3.75}px;
      height: ${(props) => props.sizes.mobileIcon * 3.75}px;
    }

    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;

    svg {
      height: ${(props) => props.sizes.desktopIcon}px;
      fill: #000;

      @media (max-width: 768px) {
        height: ${(props) => props.sizes.mobileIcon * 1.5}px;
      }
    }

    @media (min-width: 768px) {
      &:hover {
        background-color: #bada55;

        svg {
          fill: #000;
        }
      }
    }
  }

  &.pause-btn {
    padding-top: 1px;
  }

  &.play-btn {
    padding-left: 4px;
    padding-top: 1px;
  }
`;

const NextBtn = styled(IconDiv)`
  height: ${(props) => props.sizes.desktopIcon}px;

  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon * 1.55}px;
  }
`;

const PlayControls = ({ isPlaying, setIsPlaying, goToNewSong }) => {
  const {
    sizes: {
      mainPlayer: {
        icons: { desktop: desktopIcon, mobile: mobileIcon },
      },
    },
  } = useContext(MusicPageData);

  return (
    <PlayControlsDiv>
      <PrevBtn
        className='icon-div'
        onClick={() => goToNewSong(false)}
        sizes={{ desktopIcon, mobileIcon }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
          <path d='M36.09,34.14V1.78a1,1,0,0,0-1-1,1,1,0,0,0-.53.15L8.07,17.1a1,1,0,0,0,0,1.71L34.57,35a1,1,0,0,0,1.37-.33A1,1,0,0,0,36.09,34.14Z' />
          <rect width='7.67' height='35.92' rx='1' />
        </svg>
      </PrevBtn>
      <PlayPauseBtn
        className={
          'play-ctrl-btn icon-div ' + (!isPlaying ? 'play-btn' : 'pause-btn')
        }
        onClick={() => setIsPlaying((prev) => !prev)}
        sizes={{ desktopIcon, mobileIcon }}
      >
        {!isPlaying ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 536 606'>
            <polygon points='0 0 0 606 536 303 0 0' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 536 606'>
            <rect x='359' width='177' height='606' />
            <rect width='177' height='606' />
          </svg>
        )}
      </PlayPauseBtn>
      <NextBtn
        className='icon-div'
        onClick={() => goToNewSong()}
        sizes={{ desktopIcon, mobileIcon }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
          <path d='M0,1.78V34.14a1,1,0,0,0,1,1A1,1,0,0,0,1.52,35L28,18.82a1,1,0,0,0,0-1.71L1.52.93a1,1,0,0,0-1.37.33A1,1,0,0,0,0,1.78Z' />
          <rect x='28.42' width='7.67' height='35.92' rx='1' />
        </svg>
      </NextBtn>
    </PlayControlsDiv>
  );
};

export default PlayControls;
