import React, { useState, useEffect, useContext } from 'react';
import { isIOS } from 'react-device-detect';
import styled from 'styled-components';

import { MusicPageData } from '../../../containers/MusicContainer/index';
import PlaylistItem from './PlaylistItem';

import useScrollLock from '../../../helpers/useScrollLock';

const PlaylistDiv = styled.ol`
  margin-top: 1rem;
  list-style: none;

  color: ${(props) => props.theme.textWhite};

  scrollbar-width: thin;
  scrollbar-color: transparent ${(props) => props.theme.mainGreen}bf;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    appearance: none;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 2rem;
    border: 1px solid ${(props) => props.theme.textGrey}80;
    z-index: 10000;
  }

  @media (max-width: 768px) {
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.bgBlack};

    width: 100%;
    height: 100%;
    padding: 4rem 0;

    position: fixed;

    ${(props) =>
      !props.isOpen
        ? `
      opacity:0;
      transform: translateY(100%);
      pointer-events: none;
      transition: all 0.25s ease-in;
      `
        : `
      transition: all 0.25s linear;
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
      <PlaylistDiv
        isOpen={playListOpen}
        onTouchMove={(e) => isIOS && e.stopPropagation()}
      >
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
