import React, { useContext } from 'react';
import styled from 'styled-components';

import { DemosPageData } from '../../../containers/DemosContainer/index';

const ThumbnailDiv = styled.div`
  position: relative;
  color: #fff;
  display: flex;

  button {
    border: none;
    outline: none;
    background-color: transparent;
  }

  img {
    width: 100%;
  }

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const OverlayDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 0.75rem;
  font-size: 0.75rem;

  background-color: #11111180;
  opacity: 0;
  transition: opacity 0.5s ease;

  p {
    text-align: left;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);

    &:nth-of-type(2) {
      position: absolute;
      left: 0.75rem;
      bottom: 0.75rem;
    }
  }
`;

const ActiveOverlay = styled(OverlayDiv)`
  opacity: 1;
  cursor: default;
`;

const IconDiv = styled.div`
  width: 2rem;
  height: 2rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.4));

  svg {
    width: 100%;
    fill: #fff;
  }
`;

const VidLight = ({ details }) => {
  const { title, thumbnail_url, duration, video_id } = details;
  const { activeVid_id, setActiveVid_id } = useContext(DemosPageData);

  const secondsToMinute = (seconds) => {
    const remainder = seconds % 60;
    const perfectMinutes = Math.floor(seconds / 60);
    return `${perfectMinutes < 10 ? '0' + perfectMinutes : perfectMinutes}:${
      remainder < 10 ? '0' + remainder : remainder
    }`;
  };

  return (
    <ThumbnailDiv>
      <button>
        <img src={thumbnail_url} alt='thumbnail' />
      </button>
      {activeVid_id === video_id ? (
        <ActiveOverlay>
          <p>
            <strong>{title}</strong>
          </p>
        </ActiveOverlay>
      ) : (
        <OverlayDiv
          className='overlay'
          onClick={() => setActiveVid_id(video_id)}
        >
          <p>
            <strong>{title}</strong>
          </p>
          <IconDiv>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7.55 7.54'>
              <title>play-button</title>
              <path d='M6.44,1.11A3.59,3.59,0,0,0,5.24.3,3.73,3.73,0,0,0,2.31.3a3.64,3.64,0,0,0-1.2.81A3.81,3.81,0,0,0,.3,2.3,3.77,3.77,0,0,0,0,3.78,3.67,3.67,0,0,0,.3,5.24a3.74,3.74,0,0,0,.81,1.2,3.79,3.79,0,0,0,1.2.81,3.63,3.63,0,0,0,1.46.29,3.67,3.67,0,0,0,1.47-.29,3.91,3.91,0,0,0,1.2-.81,3.64,3.64,0,0,0,.81-1.2,3.63,3.63,0,0,0,.3-1.46A3.78,3.78,0,0,0,7.24,2.3,3.52,3.52,0,0,0,6.44,1.11ZM3.77,7.29A3.52,3.52,0,1,1,7.29,3.77,3.51,3.51,0,0,1,3.77,7.29Z' />
              <polygon points='2.79 5.24 5.33 3.77 2.79 2.3 2.79 5.24' />
            </svg>
          </IconDiv>
          <p>
            <strong>{secondsToMinute(duration)}</strong>
          </p>
        </OverlayDiv>
      )}
    </ThumbnailDiv>
  );
};

export default VidLight;
