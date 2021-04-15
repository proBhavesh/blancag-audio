import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import styled from 'styled-components';

import { MusicPageData } from '../../containers/MusicContainer/index';

import { urlFor } from '../../helpers/ImageUrlGetter';
import { secondsToMinute } from '../../helpers/SecondsToMinutes';

const MainPlayerDiv = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 25% auto;
  grid-template-rows: repeat(4, 1fr);
  column-gap: 2rem;

  grid-template-areas: 'img details' 'img details' 'img controls' 'img progress';
`;

const CoverDiv = styled.div`
  grid-area: img;
  width: 100%;

  img {
    width: 100%;
  }
`;

const DetailsDiv = styled.div`
  grid-area: details;
  text-align: left;

  h1 {
    line-height: 1em;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.75rem;
    color: #a6a6a6;

    strong {
      color: #fff;
    }
  }
`;

const ControlsDiv = styled.div`
  grid-area: controls;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr) 37.5%;
  align-items: center;
  justify-items: start;
  align-content: start;
`;

const VolumeDiv = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;

  &:hover {
    .bar {
      display: initial;
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
`;

const IconDiv = styled.div`
  cursor: pointer;
  height: 1rem;

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
    display: grid;
    place-items: center;
    padding-top: 2px;

    svg {
      height: 1rem;
    }
  }

  svg {
    height: 100%;
    fill: #fff;
    transition: fill 0.25s linear;
  }

  &:hover,
  &.active {
    svg {
      fill: #bada55;
    }
  }

  &:last-of-type {
    justify-self: end;
  }
`;

const ProgressDiv = styled.div`
  grid-area: progress;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 0.75rem;
`;

const ProgressBar = styled.input`
  appearance: none;
  background-color: #a0a0a080;
  height: 0.2rem;

  border-radius: 0.2rem;
  width: 100%;

  border: none;
  outline: none;

  position: relative;
  z-index: 3;
  cursor: pointer;

  &:hover {
    &::-webkit-slider-thumb {
      opacity: 1;
    }

    &:before {
      transition: none;
    }
  }

  &::-webkit-slider-thumb {
    appearance: none;
    opacity: 0;

    width: 1rem;
    height: 1rem;
    background-color: #a6a6a6;

    border-radius: 50%;
    z-index: 5;
    /* transform: translatex(50%); */

    &:hover {
      background-color: #fff;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${(props) => Math.round((props.value / props.duration) * 100)}%;
    height: 100%;

    background-color: #bada55;
    transition: width 1s linear;
    border-radius: 1rem;

    z-index: -1;
  }
`;

const MainPlayer = () => {
  const { files, activeFileIndex } = useContext(MusicPageData);
  const activeFileData = files[activeFileIndex];

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const timer = useRef(null);

  const playAudio = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const pauseAudio = () => {
    setPlaying(false);
    audioRef.current.pause();
  };

  const getCurrentTime = useCallback((e) => {
    const currentTime = Math.round(e.target.currentTime);
    setCurrentTime((prev) => (prev !== currentTime ? currentTime : prev));
  }, []);

  useEffect(() => {
    const audioEl = audioRef.current;

    audioEl.addEventListener('loadedmetadata', (e) =>
      setDuration(e.target.duration)
    );
    audioEl.addEventListener('timeupdate', getCurrentTime);

    audioEl.addEventListener('ended', () => {
      setCurrentTime(duration);
      timer.current = setTimeout(() => {
        setPlaying(false);
        setCurrentTime(0);
      }, 1500);
    });

    return () => {
      audioEl.removeEventListener('timeupdate', getCurrentTime);
      clearTimeout(timer.current);
    };
  }, [getCurrentTime, duration]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <MainPlayerDiv>
      <audio
        src={activeFileData.file}
        preload='metadata'
        ref={audioRef}
      ></audio>
      <CoverDiv>
        <img
          src={urlFor(activeFileData.cover)
            .auto('format')
            .dpr(window.devicePixelRatio)
            .url()}
          alt='cover'
        />
      </CoverDiv>
      <DetailsDiv>
        <h1>{activeFileData.title}</h1>
        <p>
          by <strong>Blanca G.</strong>
        </p>
      </DetailsDiv>
      <ControlsDiv>
        <IconDiv id='shuffle'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 74.12'>
            <path d='M30,32.74c.43-.57,5.56-6.28,7.58-8.81-7.07-8.52-13.7-13.34-26-13.34H0V21.18H11.66C20.35,21.18,23.82,24.89,30,32.74Zm44.08,20.2H69.07c-8.62,0-12.23-4.23-18.44-12.08.11-.14-4.33,5.78-6.74,8.81,7,8.52,13,13.86,25.18,13.86h5.05V74.12L90,58.21,74.12,42.35ZM70.71,21.18h3.41V31.77L90,15.91,74.12,0V10.59H70.7c-15.88,0-25.38,11.57-33.77,22.68C29.1,43.65,22.32,52.94,11.76,52.94H0V63.53H11.76C27.54,63.53,37,51.1,45.35,40,53.22,29.6,60,21.18,70.71,21.18Z' />
          </svg>
        </IconDiv>
        <IconDiv id='repeat'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 78.75'>
            <path d='M78.42,43.33a13.5,13.5,0,0,1,.13,1.8c0,7-9.22,11.12-13.67,11.12H22.5V45L0,61.88,22.5,78.75V67.5H66.19C79,67.5,90,55.23,90,42.31a19,19,0,0,0-1.31-6.92ZM11.58,35.42a13.38,13.38,0,0,1-.13-1.8c0-7,9.22-11.12,13.67-11.12H67.5V33.75L90,16.88,67.5,0V11.25H23.81C11,11.25,0,23.52,0,36.44a19.21,19.21,0,0,0,1.3,6.92Z' />
          </svg>
        </IconDiv>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconDiv style={{ marginRight: '1.5rem' }} id='prev'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
              <path d='M36.09,34.14V1.78a1,1,0,0,0-1-1,1,1,0,0,0-.53.15L8.07,17.1a1,1,0,0,0,0,1.71L34.57,35a1,1,0,0,0,1.37-.33A1,1,0,0,0,36.09,34.14Z' />
              <rect width='7.67' height='35.92' rx='1' />
            </svg>
          </IconDiv>
          <IconDiv
            className={playing ? 'pause-btn' : 'play-btn'}
            style={{ marginRight: '1.5rem' }}
            id='play'
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
          </IconDiv>
          <IconDiv id='next'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36.09 35.92'>
              <path d='M0,1.78V34.14a1,1,0,0,0,1,1A1,1,0,0,0,1.52,35L28,18.82a1,1,0,0,0,0-1.71L1.52.93a1,1,0,0,0-1.37.33A1,1,0,0,0,0,1.78Z' />
              <rect x='28.42' width='7.67' height='35.92' rx='1' />
            </svg>
          </IconDiv>
        </div>
        <VolumeDiv>
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
            onChange={(e) => setVolume(+e.target.value)}
            className='bar'
          />
        </VolumeDiv>
      </ControlsDiv>
      <ProgressDiv>
        <p>{secondsToMinute(Math.round(currentTime))}</p>
        <ProgressBar
          type='range'
          min='0'
          max={`${duration}`}
          step='0.0001'
          value={currentTime}
          duration={duration}
          onChange={(e) => {
            setCurrentTime(+e.target.value);
            audioRef.current.currentTime = +e.target.value;
          }}
        />
        <p>{secondsToMinute(Math.round(duration))}</p>
      </ProgressDiv>
    </MainPlayerDiv>
  );
};

export default MainPlayer;
