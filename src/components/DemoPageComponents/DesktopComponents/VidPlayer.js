import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import Player from '@vimeo/player';

import { DemosPageData } from '../../../containers/DemosContainer/index';

const VidPlayerDiv = styled.div`
  width: calc(100% - 20px);
  margin: 0 auto 20px;

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
    height: 100%;
    width: 100%;
  }
`;

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;

  background-color: #11111180;

  h1 {
    text-align: center;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
    font-size: ${(props) => props.size}px;
  }
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 1rem auto 0;

  filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.4));

  svg {
    width: 100%;
    fill: #fff;
    transition: fill 0.25s linear;
    &:hover {
      fill: #bada55;
    }
  }
`;

const PlayingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const VidPlayer = ({ activeVid }) => {
  const [play, setPlay] = useState(false);
  const {
    videos,
    sizes: {
      titles: {
        desktop: { mainPlayer },
      },
      icons: {
        desktop: { mainPlayer_playIcon },
      },
    },
  } = useContext(DemosPageData);
  const vidPlayerDivRef = useRef(null);
  const playerRef = useRef(null);

  const activeVidData = videos.find((v) => v.video_id === activeVid);

  useEffect(() => {
    playerRef.current = play && new Player('vid_player_div');
  }, [play]);

  useEffect(() => {
    playerRef.current && playerRef.current.on('ended', () => setPlay(false));
  });

  useEffect(() => {
    setPlay(false);
  }, [activeVid]);

  return (
    <VidPlayerDiv ref={vidPlayerDivRef} className='vid-player'>
      {!play ? (
        <NotPlayingDiv>
          <img
            src={activeVidData.thumbnail_url}
            alt={`thumbnail-${activeVidData.title}`}
          />
          <OverlayDiv size={mainPlayer}>
            <h1>{activeVidData.title}</h1>
            <IconDiv
              className='icon-div'
              onClick={() => setPlay(true)}
              size={mainPlayer_playIcon}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7.55 7.54'>
                <path d='M6.44,1.11A3.59,3.59,0,0,0,5.24.3,3.73,3.73,0,0,0,2.31.3a3.64,3.64,0,0,0-1.2.81A3.81,3.81,0,0,0,.3,2.3,3.77,3.77,0,0,0,0,3.78,3.67,3.67,0,0,0,.3,5.24a3.74,3.74,0,0,0,.81,1.2,3.79,3.79,0,0,0,1.2.81,3.63,3.63,0,0,0,1.46.29,3.67,3.67,0,0,0,1.47-.29,3.91,3.91,0,0,0,1.2-.81,3.64,3.64,0,0,0,.81-1.2,3.63,3.63,0,0,0,.3-1.46A3.78,3.78,0,0,0,7.24,2.3,3.52,3.52,0,0,0,6.44,1.11ZM3.77,7.29A3.52,3.52,0,1,1,7.29,3.77,3.51,3.51,0,0,1,3.77,7.29Z' />
                <polygon points='2.79 5.24 5.33 3.77 2.79 2.3 2.79 5.24' />
              </svg>
            </IconDiv>
          </OverlayDiv>
        </NotPlayingDiv>
      ) : (
        <PlayingDiv
          id='vid_player_div'
          data-vimeo-id={activeVidData.video_id}
          data-vimeo-width={getComputedStyle(
            vidPlayerDivRef.current
          ).getPropertyValue('width')}
          data-vimeo-autoplay={true}
        ></PlayingDiv>
      )}
    </VidPlayerDiv>
  );
};

export default VidPlayer;
