import React, { useState } from 'react';
import styled from 'styled-components';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

const ListItem = styled.li`
  width: 100%;

  display: grid;
  grid-template-columns: 6rem 75% auto min-content;
  align-items: center;
  justify-items: start;
  column-gap: 0;

  padding: 0.5rem;

  border-bottom: 1px solid #a6a6a680;

  &:last-of-type {
    border-bottom: none;
  }

  h4 {
    font-weight: normal;
  }

  transition: background-color 0.25s linear;

  &:not(.active):hover {
    cursor: pointer;
    background-color: #a6a6a640;
  }

  &.active {
    background-color: #bada55bf;
    color: #000;
  }
`;

const IconDiv = styled.div`
  height: 0.75rem;
  justify-self: center;

  display: grid;
  place-items: center;

  svg {
    fill: #fff;
    height: 100%;
  }
`;

const PlaylistItem = ({ file, index, active, setActiveFileIndex }) => {
  const [duration, setDuration] = useState(0);

  return (
    <>
      <audio
        src={file.file}
        preload='metadata'
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      ></audio>
      <ListItem
        className={active ? 'active' : ''}
        onClick={() => setActiveFileIndex(index - 1)}
      >
        <p>{index}</p>
        <h4>{file.title}</h4>
        <IconDiv>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28.01'>
            <path d='M28,10a1,1,0,0,1-.33.74l-10,9a1,1,0,0,1-1.08.17A1,1,0,0,1,16,19V15.19A18.61,18.61,0,0,0,2.19,27.34a1,1,0,0,1-.94.67H1.16a1,1,0,0,1-.9-.83A19.22,19.22,0,0,1,0,24.06,19,19,0,0,1,16,5.31V1A1,1,0,0,1,17.67.26l10,9A1,1,0,0,1,28,10Z' />
          </svg>
        </IconDiv>
        <p>{secondsToMinute(Math.round(duration))}</p>
      </ListItem>
    </>
  );
};

export default PlaylistItem;
