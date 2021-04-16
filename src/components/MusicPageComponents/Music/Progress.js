import React from 'react';
import styled from 'styled-components';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

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
  background-color: #a0a0a080;
  height: 0.2rem;

  border-radius: 0.2rem;
  width: 100%;

  border: none;
  outline: none;

  z-index: 3;
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
    z-index: 5;

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

  z-index: 4;
`;

const CurrentTime = styled.p`
  user-select: none;
  letter-spacing: 0.1em;
  @media (max-width: 768px) {
    grid-area: currentTime;
    justify-self: flex-start;
  }
`;

const Duration = styled.p`
  user-select: none;
  letter-spacing: 0.1em;
  @media (max-width: 768px) {
    grid-area: duration;
    justify-self: flex-end;
  }
`;

const Progress = ({ currentTime, setCurrentTime, duration, audioRef }) => {
  return (
    <ProgressDiv>
      <CurrentTime>{secondsToMinute(Math.round(currentTime))}</CurrentTime>
      <ProgressBarContainer>
        <ProgressBar
          type='range'
          min='0'
          max={`${duration}`}
          step='any'
          value={currentTime}
          duration={duration}
          onChange={(e) => {
            setCurrentTime(+e.target.value);
            audioRef.currentTime = +e.target.value;
          }}
        />
        <GreenProgress
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </ProgressBarContainer>
      <Duration>{secondsToMinute(Math.round(duration))}</Duration>
    </ProgressDiv>
  );
};

export default Progress;
