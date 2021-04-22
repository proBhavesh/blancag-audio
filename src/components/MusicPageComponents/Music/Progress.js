import React, { useContext } from 'react';
import styled from 'styled-components';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

import { MusicPageData } from '../../../containers/MusicContainer/index';

const ProgressDiv = styled.div`
  grid-area: progress;
  align-self: end;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 2rem;

  font-size: 0.75rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'bar bar' 'currentTime duration';
    gap: 0.5rem;
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  height: 0.2rem;
  width: 100%;
  @media (max-width: 768px) {
    grid-area: bar;
  }
`;

const ProgressBar = styled.input`
  position: absolute;
  top: 0;
  left: 0;

  appearance: none;
  background-color: transparent;
  height: 0.2rem;

  border-radius: 0.2rem;
  width: 100%;

  border: none;
  outline: none;

  cursor: pointer;

  &:hover {
    &::-webkit-slider-thumb {
      opacity: 1;
    }
  }

  &::-webkit-slider-thumb {
    appearance: none;
    opacity: 0;

    @media (max-width: 768px) {
      transition: transform 0.25s linear;
      opacity: 1;
    }

    width: 0.75rem;
    height: 0.75rem;
    background-color: #a6a6a6;

    border-radius: 50%;

    &:hover,
    &:active {
      background-color: #fff;
      @media (max-width: 768px) {
        transform: scale(1.2);
      }
    }
  }
`;

const GreenProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 0.2rem;

  background-color: #bada55;
  border-radius: 1rem;
`;

const GreyProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #a6a6a680;
  height: 0.2rem;
  border-radius: 0.2rem;
  width: 100%;
`;

const Time = styled.p`
  user-select: none;
  letter-spacing: 0.1em;
`;

const CurrentTime = styled(Time)`
  font-size: ${(props) => props.sizes.desktopDuration}px;
  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobileDuration}px;
    grid-area: currentTime;
    justify-self: flex-start;
  }
`;

const Duration = styled(Time)`
  font-size: ${(props) => props.sizes.desktopDuration}px;
  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobileDuration}px;
    grid-area: duration;
    justify-self: flex-end;
  }
`;

const Progress = ({ currentTime, setCurrentTimeFn, duration }) => {
  const {
    sizes: {
      mainPlayer: {
        duration: { desktop: desktopDuration, mobile: mobileDuration },
      },
    },
  } = useContext(MusicPageData);
  return (
    <ProgressDiv>
      <CurrentTime sizes={{ desktopDuration, mobileDuration }}>
        {secondsToMinute(Math.floor(currentTime))}
      </CurrentTime>
      <ProgressBarContainer>
        <GreyProgress />
        <GreenProgress
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <ProgressBar
          type='range'
          min='0'
          max={`${duration}`}
          step='any'
          value={currentTime}
          duration={duration}
          onChange={(e) => setCurrentTimeFn(+e.target.value)}
        />
      </ProgressBarContainer>
      <Duration sizes={{ desktopDuration, mobileDuration }}>
        {secondsToMinute(Math.floor(duration))}
      </Duration>
    </ProgressDiv>
  );
};

export default Progress;
