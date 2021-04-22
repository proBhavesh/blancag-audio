import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
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
    color: #a6a6a6;
    letter-spacing: 0.15em;

    strong {
      color: #fff;
      font-weight: bolder;

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
  height: ${(props) => props.sizes.desktopIcon}px;
  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon}px;
    grid-area: shuffle;
  }
`;

const RepeatControl = styled(IconDiv)`
  height: ${(props) => props.sizes.desktopIcon}px;
  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileIcon}px;
    grid-area: repeatCtrl;
    justify-self: end;
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

  const audioRef = useRef(null);
  const shuffleRef = useRef(null);
  const repeatRef = useRef(null);
  const rAF = useRef(null);
  const timer = useRef(null);

  const audioCtx = useRef(null);
  const gainNode = useRef(null);

  useEffect(() => {
    isPlaying ? playAudio() : pauseAudio();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current && (() => (audioRef.current.volume = volume))();
  }, [volume]);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx.current = new AudioContext();

    // Create a MediaElementAudioSourceNode
    // Feed the HTMLMediaElement into it
    const source =
      audioRef.current &&
      audioCtx.current.createMediaElementSource(audioRef.current);

    // Create a gain node
    gainNode.current = audioCtx.current.createGain();

    // connect the AudioBufferSourceNode to the gainNode
    // and the gainNode to the destination
    source.connect(gainNode.current);
    gainNode.current.connect(audioCtx.current.destination);

    return () => {
      clearTimeout(timer.current);
      cancelAnimationFrame(rAF.current);
      gainNode.current.gain.cancelScheduledValues(audioCtx.current.currentTime);
    };
  }, []);

  return id > files.length - 1 ? (
    <Redirect to='/music/0' />
  ) : (
    <MainPlayerDiv>
      <audio
        src={activeFileData.file}
        crossOrigin='anonymous'
        preload='auto'
        ref={audioRef}
        onDurationChange={(e) => {
          setDuration(e.target.duration);
          setIsPlaying(false);
        }}
        onLoadedData={() =>
          state && state.redirect && state.playState && setIsPlaying(true)
        }
        onTimeUpdate={() =>
          (rAF.current = requestAnimationFrame(getCurrentTime))
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
          {window.innerWidth > 768 && <>By </>}
          <strong>Blanca G.</strong>
        </p>
      </DetailsDiv>
      <ControlsDiv>
        <ShuffleControl
          ref={shuffleRef}
          className={shuffle ? 'active' : ''}
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
          onClick={() => {
            repeatRef.current.classList.toggle('active');
            setRepeat((prev) => !prev);
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
        {window.innerWidth > 768 && <Volume />}
      </ControlsDiv>
      <Progress
        duration={duration}
        currentTime={currentTime}
        setCurrentTimeFn={setCurrentTimeFn}
      />
    </MainPlayerDiv>
  );

  function playAudio() {
    audioRef.current.play().catch((err) => setIsPlaying(false));
    // fade in on play
    let currentValue = 0.001;
    let endTime = audioCtx.current.currentTime + 0.5;
    gainNode.current.gain.cancelScheduledValues(audioCtx.current.currentTime);
    gainNode.current.gain.setValueAtTime(
      currentValue,
      audioCtx.current.currentTime
    );
    gainNode.current.gain.linearRampToValueAtTime(1, endTime);
  }

  function pauseAudio() {
    // fade out on pause
    audioCtx.current &&
      gainNode.current &&
      (() => {
        let currentValue = 1;
        let endTime = audioCtx.current.currentTime + 0.35;
        gainNode.current.gain.cancelScheduledValues(
          audioCtx.current.currentTime
        );
        gainNode.current.gain.setValueAtTime(
          currentValue,
          audioCtx.current.currentTime
        );
        gainNode.current.gain.linearRampToValueAtTime(0.0000001, endTime);

        const timer = setInterval(() => {
          if (
            gainNode.current.gain.value.toFixed(7) <= 0.0000001 &&
            audioRef.current
          ) {
            audioRef.current.pause();
            cancelAnimationFrame(rAF.current);
            clearInterval(timer);
          }
        }, 50);
      })();
  }

  function getCurrentTime() {
    audioRef.current && setCurrentTime(audioRef.current.currentTime);
    rAF.current = requestAnimationFrame(getCurrentTime);
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
    history.push({
      pathname: `/music/${getNewIndex(next)}`,
      state: {
        redirect: true,
        playState: isPlaying,
      },
    });
  }
};

export default MainPlayer;
