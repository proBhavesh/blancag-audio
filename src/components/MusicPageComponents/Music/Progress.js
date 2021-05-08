import React, { useContext } from 'react';
import styled from 'styled-components';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

import { MusicPageData } from '../../../containers/MusicContainer/index';

const ProgressDiv = styled.div`
  grid-area: progress;
  align-self: end;
  width: 100%;

  margin-top: 1rem;

  display: flex;
  align-items: center;

  font-size: 0.75rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'bar bar' 'currentTime duration';
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    grid-area: bar;
  }

  @media (min-width: 768px) {
    &:hover {
      input::-webkit-slider-thumb {
        opacity: 1;
      }
    }
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

  &::-webkit-slider-thumb {
    appearance: none;
    opacity: 0;

    @media (max-width: 768px) {
      opacity: 1;
    }

    width: 0.75rem;
    height: 0.75rem;

    border-radius: 50%;
    background-color: ${(props) => props.theme.textWhite};
    border: 1px solid #333;

    @media (min-width: 768px) {
      background-color: ${(props) => props.theme.textGrey};
      &:hover,
      &:active {
        background-color: ${(props) => props.theme.textWhite};
      }
    }
  }
`;

const GreenProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 0.2rem;

  background-color: ${(props) => props.theme.mainGreen};
  border-radius: 1rem;
`;

const GreyProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.textGrey}80;
  height: 0.2rem;
  border-radius: 0.2rem;
  width: 100%;
`;

const Time = styled.p`
  user-select: none;
  letter-spacing: 0.1em;
`;

const CurrentTime = styled(Time)`
  margin-right: 0.65em;
  font-size: ${(props) => props.sizes.desktopDuration}px;
  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobileDuration}px;
    grid-area: currentTime;
    justify-self: flex-start;
  }
`;

const Duration = styled(Time)`
  margin-left: 0.75em;
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
        <div style={{ width: '100%', height: '0.2rem', position: 'relative' }}>
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
            onChange={(e) => setCurrentTimeFn(+e.target.value)}
          />
        </div>
      </ProgressBarContainer>
      <Duration sizes={{ desktopDuration, mobileDuration }}>
        {secondsToMinute(Math.floor(duration))}
      </Duration>
    </ProgressDiv>
  );
};

export default Progress;
