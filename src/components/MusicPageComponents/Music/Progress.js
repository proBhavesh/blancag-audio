import React from 'react';
import styled from 'styled-components';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

const ProgressDiv = styled.div`
  grid-area: progress;
  align-self: end;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 0.75rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'bar bar' 'currentTime duration';
    gap: 0.5rem;
  }
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

  @media (max-width: 768px) {
    grid-area: bar;
  }
`;

const CurrentTime = styled.p`
  @media (max-width: 768px) {
    grid-area: currentTime;
    justify-self: flex-start;
  }
`;

const Duration = styled.p`
  @media (max-width: 768px) {
    grid-area: duration;
    justify-self: flex-end;
  }
`;

const Progress = ({ currentTime, setCurrentTime, duration, audioRef }) => {
  return (
    <ProgressDiv>
      <CurrentTime>{secondsToMinute(Math.round(currentTime))}</CurrentTime>
      <ProgressBar
        type='range'
        min='0'
        max={`${duration}`}
        step='0.0001'
        value={currentTime}
        duration={duration}
        onChange={(e) => {
          setCurrentTime(+e.target.value);
          audioRef.currentTime = +e.target.value;
        }}
      />
      <Duration>{secondsToMinute(Math.round(duration))}</Duration>
    </ProgressDiv>
  );
};

export default Progress;
