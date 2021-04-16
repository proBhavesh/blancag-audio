import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import styled from 'styled-components';

import { MusicPageData } from '../../../containers/MusicContainer/index';

import { urlFor } from '../../../helpers/ImageUrlGetter';
import { IconDiv } from './IconDiv';

import PlayControls from './PlayControls';
import Volume from './Volume';
import Progress from './Progress';

const MainPlayerDiv = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 30% auto;
  grid-template-rows: repeat(4, 1fr);
  column-gap: 2rem;

  grid-template-areas: 'img details' 'img details' 'img controls' 'img progress';

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, min-content);
    grid-template-areas: 'img' 'details' 'progress' 'controls' 'controls';
    grid-auto-rows: min-content;
    column-gap: 0;
    row-gap: 2rem;
  }
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
    letter-spacing: 0.15em;

    strong {
      color: #fff;
      font-weight: bolder;
      margin-left: 0.25rem;

      @media (max-width: 768px) {
        font-weight: normal;
      }
    }
  }
`;

const ControlsDiv = styled.div`
  grid-area: controls;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: start;
  align-content: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);

    grid-template-areas: 'shuffle controls repeatCtrl';
    row-gap: 1em;
  }
`;

const ShuffleControl = styled(IconDiv)`
  @media (max-width: 768px) {
    grid-area: shuffle;
  }
`;

const RepeatControl = styled(IconDiv)`
  @media (max-width: 768px) {
    grid-area: repeatCtrl;
    justify-self: end;
  }
`;

const MainPlayer = () => {
  const { files, activeFileIndex, setActiveFileIndex } = useContext(
    MusicPageData
  );
  const activeFileData = files[activeFileIndex];

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const timer = useRef(null);

  const shuffleRef = useRef(null);
  const repeatRef = useRef(null);

  const rAF = useRef(null);

  const playAudio = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const pauseAudio = () => {
    setPlaying(false);
    audioRef.current.pause();
    cancelAnimationFrame(rAF.current);
  };

  const changeSong = useCallback(
    (next = true) => {
      const length = files.length;
      if (!shuffle) {
        const newIndex = next
          ? activeFileIndex + 1 === length
            ? 0
            : activeFileIndex + 1
          : activeFileIndex - 1 < 0
          ? length - 1
          : activeFileIndex - 1;
        setActiveFileIndex(newIndex);
      } else {
        let newIndex = activeFileIndex;

        while (newIndex === activeFileIndex) {
          newIndex = Math.floor(Math.random() * length);
        }

        setActiveFileIndex(newIndex);
      }
    },
    [activeFileIndex, setActiveFileIndex, files, shuffle]
  );

  // -- get current time of the audio while playing
  const getCurrentTime = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
    rAF.current = requestAnimationFrame(getCurrentTime);
  }, []);

  // -- handle audio ended
  useEffect(() => {
    audioRef.current.addEventListener('ended', () => {
      setCurrentTime(duration);
      cancelAnimationFrame(rAF.current);
      timer.current = setTimeout(() => {
        setCurrentTime(0);
        !repeat ? changeSong() : playAudio();
      }, 1500);
    });
    return () => {
      clearTimeout(timer.current);
    };
  }, [duration, repeat, changeSong]);

  // -- handle song change
  useEffect(() => {
    cancelAnimationFrame(rAF.current);
    activeFileIndex !== 0 && playAudio();
  }, [activeFileIndex]);

  return (
    <MainPlayerDiv>
      <audio
        src={activeFileData.file}
        preload='metadata'
        ref={audioRef}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onPlaying={() => (rAF.current = requestAnimationFrame(getCurrentTime))}
        onPause={() => cancelAnimationFrame(rAF.current)}
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
          {window.innerWidth > 768 && <>By </>}
          <strong>Blanca G.</strong>
        </p>
      </DetailsDiv>
      <ControlsDiv>
        <ShuffleControl
          ref={shuffleRef}
          onClick={() => {
            shuffleRef.current.classList.toggle('active');
            setShuffle((prev) => !prev);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 74.12'>
            <path d='M30,32.74c.43-.57,5.56-6.28,7.58-8.81-7.07-8.52-13.7-13.34-26-13.34H0V21.18H11.66C20.35,21.18,23.82,24.89,30,32.74Zm44.08,20.2H69.07c-8.62,0-12.23-4.23-18.44-12.08.11-.14-4.33,5.78-6.74,8.81,7,8.52,13,13.86,25.18,13.86h5.05V74.12L90,58.21,74.12,42.35ZM70.71,21.18h3.41V31.77L90,15.91,74.12,0V10.59H70.7c-15.88,0-25.38,11.57-33.77,22.68C29.1,43.65,22.32,52.94,11.76,52.94H0V63.53H11.76C27.54,63.53,37,51.1,45.35,40,53.22,29.6,60,21.18,70.71,21.18Z' />
          </svg>
        </ShuffleControl>
        <RepeatControl
          ref={repeatRef}
          onClick={() => {
            repeatRef.current.classList.toggle('active');
            setRepeat((prev) => !prev);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 78.75'>
            <path d='M78.42,43.33a13.5,13.5,0,0,1,.13,1.8c0,7-9.22,11.12-13.67,11.12H22.5V45L0,61.88,22.5,78.75V67.5H66.19C79,67.5,90,55.23,90,42.31a19,19,0,0,0-1.31-6.92ZM11.58,35.42a13.38,13.38,0,0,1-.13-1.8c0-7,9.22-11.12,13.67-11.12H67.5V33.75L90,16.88,67.5,0V11.25H23.81C11,11.25,0,23.52,0,36.44a19.21,19.21,0,0,0,1.3,6.92Z' />
          </svg>
        </RepeatControl>
        <PlayControls
          playing={playing}
          pauseAudio={pauseAudio}
          playAudio={playAudio}
          changeSong={changeSong}
        />
        {window.innerWidth > 768 && <Volume audioRef={audioRef.current} />}
      </ControlsDiv>
      <Progress
        currentTime={currentTime}
        duration={duration}
        setCurrentTime={setCurrentTime}
        audioRef={audioRef.current}
      />
    </MainPlayerDiv>
  );
};

export default MainPlayer;
