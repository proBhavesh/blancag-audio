import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { MusicPageData } from '../../../containers/MusicContainer/index';
import PlaylistItem from './PlaylistItem';

import useScrollLock from '../../../helpers/useScrollLock';

const PlaylistDiv = styled.ol`
  height: calc(100% - 2rem);
  margin-top: 2rem;
  list-style: none;

  color: #fff;

  scrollbar-width: thin;
  scrollbar-color: transparent #bada55bf;
  overflow-x: hidden;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    appearance: none;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00000080;
    border-radius: 2rem;
    border: 1px solid #a0a0a080;
    z-index: 10000;
  }

  @media (max-width: 768px) {
    top: 0;
    left: 0;
    background-color: #000;

    width: 100%;
    height: 100%;
    padding: 3rem 0;

    transition: all 0.5s ease-in;
    position: fixed;

    ${(props) =>
      !props.isOpen
        ? `
    opacity:0;
    transform: translateY(100%);
    pointer-events: none;
      `
        : `
    opacity: 1;
    transform: translateY(0);
    pointer-events: initial;
  `}
  }
`;

const MainPlaylist = ({ id, playListOpen }) => {
  const { files } = useContext(MusicPageData);

  const { stopScroll, resumeScroll } = useScrollLock();
  // index of the item showing share icons
  const [showIconsItemIndex, setShowIconsItemIndex] = useState(0);

  useEffect(() => {
    playListOpen ? stopScroll() : resumeScroll();
  }, [playListOpen, stopScroll, resumeScroll]);

  return (
    <>
      <PlaylistDiv isOpen={playListOpen}>
        {files.map((file, index) => (
          <PlaylistItem
            key={index}
            file={file}
            index={index + 1}
            active={index === id}
            showIconsItemIndex={showIconsItemIndex}
            setShowIconsItemIndex={setShowIconsItemIndex}
          />
        ))}
      </PlaylistDiv>
    </>
  );
};

export default MainPlaylist;
