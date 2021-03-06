import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { MusicPageData } from '../../../containers/MusicContainer/index';

import { urlFor } from '../../../helpers/ImageUrlGetter';
import useDocDims from '../../../helpers/useDocDims';

import { IconDiv } from './IconDiv';

import PlayControls from './PlayControls';
import Volume from './Volume';
import Progress from './Progress';

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame;

const MainPlayerDiv = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 30% auto;
  column-gap: 2rem;

  grid-template-areas: 'img details' 'img details' 'img controls' 'img progress';

  @media (max-width: 768px) {
    max-width: 500px;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, min-content);
    grid-template-areas: 'img' 'details' 'progress' 'controls' 'controls';
    grid-auto-rows: min-content;
    column-gap: 0;
  }
`;

const CoverDiv = styled.div`
  grid-area: img;
  width: 100%;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`;

const DetailsDiv = styled.div`
  grid-area: details;
  text-align: left;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0.25rem;
  }

  h1 {
    line-height: 1em;
    margin-bottom: 0.5rem;
    font-size: ${(props) => props.sizes.desktopTitle}px;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobileTitle}px;
    }
  }

  p {
    font-size: ${(props) => props.sizes.desktopByLine}px;
    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobileByLine}px;
    }
    color: ${(props) => props.theme.textGrey};

    strong {
      color: ${(props) => props.theme.textWhite};
      font-weight: 600;

      @media (max-width: 768px) {
        color: ${(props) => props.theme.textGrey};
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
  height: ${(props) => props.sizes.desktopIcon}px;
  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon}px;
    grid-area: shuffle;
    svg {
      fill: ${(props) => props.theme.textGrey};
    }
  }
`;

const RepeatControl = styled(IconDiv)`
  height: ${(props) => props.sizes.desktopIcon}px;
  margin-left: 0.5rem;
  @media (max-width: 768px) {
    margin-left: 0;
    height: ${(props) => props.sizes.mobileIcon}px;
    grid-area: repeatCtrl;
    justify-self: end;
    svg {
      fill: ${(props) => props.theme.textGrey};
    }
  }
`;

const MainPlayer = ({ id }) => {
  const history = useHistory();
  const { state } = useLocation();

  const {
    files,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    volume,
    sizes: {
      mainPlayer: {
        title: { desktop: desktopTitle, mobile: mobileTitle },
        byLine: { desktop: desktopByLine, mobile: mobileByLine },
        icons: { desktop: desktopIcon, mobile: mobileIcon },
      },
    },
  } = useContext(MusicPageData);
  const activeFileData = files[id];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unlock, setUnlock] = useState(false);

  const audioRef = useRef(null);
  const shuffleRef = useRef(null);
  const repeatRef = useRef(null);
  const rAF = useRef(null);
  const timer = useRef(null);

  const width = useDocDims();

  const getCurrentTime = useCallback(() => {
    audioRef.current && setCurrentTime(audioRef.current.currentTime);
    rAF.current = requestAnimationFrame(getCurrentTime);
  }, []);

  const playAudio = useCallback(() => {
    audioRef.current.play().catch((err) => {
      setIsPlaying(false);
      console.log(err);
      cancelAnimationFrame(rAF.current);
    });
    rAF.current = requestAnimationFrame(getCurrentTime);
  }, [getCurrentTime]);

  useEffect(() => {
    isPlaying ? playAudio() : pauseAudio();
  }, [isPlaying, playAudio]);

  useEffect(() => {
    audioRef.current && (() => (audioRef.current.volume = volume))();
  }, [volume]);

  useEffect(() => {
    // -- unlocking audios
    function unlockFn() {
      if (audioRef.current && !unlock) {
        audioRef.current.play();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setUnlock(true);
      }
    }
    // mobile
    isMobile
      ? document.body.addEventListener('touchstart', unlockFn, false)
      : // desktop
        document.body.addEventListener('click', unlockFn, false);
    return () => {
      isMobile
        ? document.body.removeEventListener('touchstart', unlockFn, false)
        : document.body.removeEventListener('click', unlockFn, false);
    };
  }, [unlock]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      cancelAnimationFrame(rAF.current);
    };
  }, []);

  return id > files.length - 1 ? (
    <Redirect to={{ pathname: '/music' }} />
  ) : (
    <MainPlayerDiv className='main-player'>
      <audio
        src={activeFileData.file}
        preload='auto'
        ref={audioRef}
        onDurationChange={(e) => {
          setCurrentTime(0);
          setDuration(e.target.duration);
          setIsPlaying(false);
        }}
        onLoadedData={() =>
          state && state.redirect && state.playState && setIsPlaying(true)
        }
        onEnded={() => {
          if (!repeat) {
            timer.current = setTimeout(() => {
              goToNewSong();
            }, 1000);
          } else {
            setIsPlaying(false);
            timer.current = setTimeout(() => {
              setCurrentTime(0);
              setIsPlaying(true);
            }, 1000);
          }
        }}
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
      <DetailsDiv
        sizes={{ desktopTitle, mobileTitle, desktopByLine, mobileByLine }}
      >
        <h1>{activeFileData.title}</h1>
        <p>
          {width > 768 && <>By </>}
          <strong>Blanca G.</strong>
        </p>
      </DetailsDiv>
      <ControlsDiv>
        <ShuffleControl
          ref={shuffleRef}
          className={'icon-div' + (shuffle ? ' active' : '')}
          onClick={() => {
            setShuffle((prev) => !prev);
          }}
          sizes={{ desktopIcon, mobileIcon }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 74.12'>
            <path d='M30,32.74c.43-.57,5.56-6.28,7.58-8.81-7.07-8.52-13.7-13.34-26-13.34H0V21.18H11.66C20.35,21.18,23.82,24.89,30,32.74Zm44.08,20.2H69.07c-8.62,0-12.23-4.23-18.44-12.08.11-.14-4.33,5.78-6.74,8.81,7,8.52,13,13.86,25.18,13.86h5.05V74.12L90,58.21,74.12,42.35ZM70.71,21.18h3.41V31.77L90,15.91,74.12,0V10.59H70.7c-15.88,0-25.38,11.57-33.77,22.68C29.1,43.65,22.32,52.94,11.76,52.94H0V63.53H11.76C27.54,63.53,37,51.1,45.35,40,53.22,29.6,60,21.18,70.71,21.18Z' />
          </svg>
        </ShuffleControl>
        <RepeatControl
          ref={repeatRef}
          className='icon-div'
          onClick={() => {
            (() => {
              repeatRef.current.classList.toggle('active');
              setRepeat((prev) => !prev);
            })();
          }}
          sizes={{ desktopIcon, mobileIcon }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 90 78.75'>
            <path d='M78.42,43.33a13.5,13.5,0,0,1,.13,1.8c0,7-9.22,11.12-13.67,11.12H22.5V45L0,61.88,22.5,78.75V67.5H66.19C79,67.5,90,55.23,90,42.31a19,19,0,0,0-1.31-6.92ZM11.58,35.42a13.38,13.38,0,0,1-.13-1.8c0-7,9.22-11.12,13.67-11.12H67.5V33.75L90,16.88,67.5,0V11.25H23.81C11,11.25,0,23.52,0,36.44a19.21,19.21,0,0,0,1.3,6.92Z' />
          </svg>
        </RepeatControl>
        <PlayControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          goToNewSong={goToNewSong}
        />
        {width > 768 && <Volume />}
      </ControlsDiv>
      <Progress
        duration={duration}
        currentTime={currentTime}
        setCurrentTimeFn={setCurrentTimeFn}
      />
    </MainPlayerDiv>
  );

  function pauseAudio() {
    audioRef.current.pause();
    cancelAnimationFrame(rAF.current);
  }

  function setCurrentTimeFn(time) {
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  }

  function getNewIndex(next = true) {
    let newIndex;
    const length = files.length;

    if (!shuffle) {
      if (next) {
        newIndex = id + 1 >= length ? 0 : id + 1;
      } else {
        newIndex = id - 1 < 0 ? length - 1 : id - 1;
      }
    } else {
      newIndex = getRandomIndex();
    }

    return newIndex;
  }

  function getRandomIndex() {
    const length = files.length;
    let randomIndex = Math.floor(Math.random() * length);

    if (
      randomIndex === id ||
      randomIndex === (id + 1 === length ? 0 : id + 1) ||
      randomIndex === (id - 1 < 0 ? length - 1 : id - 1)
    ) {
      randomIndex = getRandomIndex();
    }

    return randomIndex;
  }

  function goToNewSong(next = true) {
    const newId = getNewIndex(next);
    const newTitle = encodeURI(files[newId].title).replaceAll('%20', '+');
    history.push({
      pathname: `/music`,
      state: {
        redirect: true,
        playState: isPlaying,
      },
      search: `?id=${newId}&title=${newTitle}`,
    });
  }
};

export default MainPlayer;
