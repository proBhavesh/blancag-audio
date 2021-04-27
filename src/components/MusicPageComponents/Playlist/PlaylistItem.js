import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ShareIcons from './ShareIcons';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';
import useDocDims from '../../../helpers/useDocDims';

import { MusicPageData } from '../../../containers/MusicContainer/index';

const ListItem = styled.li`
  width: 100%;

  padding: 0.5rem;
  padding-right: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    padding-right: 1.5rem;
  }

  border-bottom: 1px solid ${(props) => props.theme.textGrey}80;

  &:last-of-type {
    border-bottom: none;
  }

  h4 {
    font-weight: normal;
  }

  transition: background-color 0.25s linear;

  @media (min-width: 768px) {
    &:not(.active):hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.textGrey}40;
    }
  }

  &.active {
    background-color: ${(props) => props.theme.mainGreen}bf;
    color: ${(props) => props.theme.bgBlack};

    svg {
      fill: ${(props) => props.theme.bgBlack};
    }
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;

  width: 100%;

  display: grid;
  grid-template-columns: 6rem minmax(max-content, 50%) auto min-content;
  grid-template-areas: 'number title share duration';
  align-items: center;
  justify-items: start;
  column-gap: 0;

  font-size: ${(props) => props.sizes.desktopTitle}px;

  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobileTitle}px;
    grid-template-columns: minmax(max-content, 50%) auto;
    grid-template-areas: 'title share' 'duration share';
    row-gap: 0.5rem;
  }

  p {
    grid-area: number;

    &:last-of-type {
      grid-area: duration;
      @media (max-width: 768px) {
        justify-self: flex-start;
        font-size: ${(props) => props.sizes.durationMobile}px;
      }
    }
  }

  h4 {
    grid-area: title;
  }
`;

const PlaylistItem = ({
  file,
  index,
  active,
  showIconsItemIndex,
  setShowIconsItemIndex,
}) => {
  const [duration, setDuration] = useState(0);

  const {
    sizes: {
      playlist: {
        title: { desktop: desktopTitle, mobile: mobileTitle },
        durationMobile,
      },
    },
  } = useContext(MusicPageData);

  const width = useDocDims();

  return (
    <>
      <audio
        src={file.file}
        preload='metadata'
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      ></audio>
      <ListItem className={active ? 'active' : ''}>
        <LinkStyled
          className='playlist-item'
          to={{
            pathname: `/music`,
            state: { redirect: true },
            search: `${index - 1}`,
          }}
          sizes={{ desktopTitle, mobileTitle, durationMobile }}
          onClick={() => setShowIconsItemIndex(index - 1)}
        >
          {width > 768 && <p>{index}</p>}
          <h4>{file.title}</h4>
          <ShareIcons
            index={index}
            showIconsItemIndex={showIconsItemIndex}
            setShowIconsItemIndex={setShowIconsItemIndex}
          />
          <p>{secondsToMinute(Math.round(duration))}</p>
        </LinkStyled>
      </ListItem>
    </>
  );
};

export default PlaylistItem;
