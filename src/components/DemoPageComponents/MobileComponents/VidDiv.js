import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import Player from '@vimeo/player';

import { DemosPageData } from '../../../containers/DemosContainer/index';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

const VidPlayerDiv = styled.div`
  color: #fff;
  width: 100%;
  margin-bottom: 1rem;

  padding-top: 56.25%;
  position: relative;

  font-family: 'Open Sans', sans-serif;
`;

const NotPlayingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
`;

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.size}px;

  padding: 0.5rem 0.75rem;

  background-color: #11111180;

  p {
    text-align: left;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);

    &:nth-of-type(2) {
      position: absolute;
      left: 0.75rem;
      bottom: 0.5rem;
    }
  }
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

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

const PlayingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const VidDiv = ({ details, index }) => {
  const [play, setPlay] = useState(false);
  const {
    activeVid_id,
    setActiveVid_id,
    sizes: {
      titles: { mobile },
      icons: {
        mobile: { playIcon: mobileIcon },
      },
    },
  } = useContext(DemosPageData);
  const vidPlayerDivRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = play && new Player(`vid_player_div_${index}`);
  }, [play, index]);

  useEffect(() => {
    playerRef.current && playerRef.current.on('ended', () => setPlay(false));
  });

  useEffect(() => {
    activeVid_id !== details.video_id && setPlay(false);
  }, [activeVid_id, details.video_id]);

  return (
    <VidPlayerDiv ref={vidPlayerDivRef}>
      {!play ? (
        <NotPlayingDiv>
          <img src={details.thumbnail_url} alt={`thumbnail-${details.title}`} />
          <OverlayDiv size={mobile}>
            <p>
              <strong>{details.title}</strong>
            </p>
            <IconDiv
              size={mobileIcon}
              onClick={() => {
                setActiveVid_id(details.video_id);
                setPlay(true);
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7.55 7.54'>
                <path d='M6.44,1.11A3.59,3.59,0,0,0,5.24.3,3.73,3.73,0,0,0,2.31.3a3.64,3.64,0,0,0-1.2.81A3.81,3.81,0,0,0,.3,2.3,3.77,3.77,0,0,0,0,3.78,3.67,3.67,0,0,0,.3,5.24a3.74,3.74,0,0,0,.81,1.2,3.79,3.79,0,0,0,1.2.81,3.63,3.63,0,0,0,1.46.29,3.67,3.67,0,0,0,1.47-.29,3.91,3.91,0,0,0,1.2-.81,3.64,3.64,0,0,0,.81-1.2,3.63,3.63,0,0,0,.3-1.46A3.78,3.78,0,0,0,7.24,2.3,3.52,3.52,0,0,0,6.44,1.11ZM3.77,7.29A3.52,3.52,0,1,1,7.29,3.77,3.51,3.51,0,0,1,3.77,7.29Z' />
                <polygon points='2.79 5.24 5.33 3.77 2.79 2.3 2.79 5.24' />
              </svg>
            </IconDiv>
            <p>
              <strong>{secondsToMinute(details.duration)}</strong>
            </p>
          </OverlayDiv>
        </NotPlayingDiv>
      ) : (
        <PlayingDiv
          id={`vid_player_div_${index}`}
          data-vimeo-id={details.video_id}
          data-vimeo-width={getComputedStyle(
            vidPlayerDivRef.current
          ).getPropertyValue('width')}
          data-vimeo-autoplay={true}
        ></PlayingDiv>
      )}
    </VidPlayerDiv>
  );
};

export default VidDiv;
