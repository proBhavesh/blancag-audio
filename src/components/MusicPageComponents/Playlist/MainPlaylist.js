import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    transition: all 0.5s linear;
    z-index: 5000;

    ${(props) =>
      !props.isOpen
        ? `
      position: fixed;
      opacity:0;
      transform: translateY(100%);
      pointer-events: none;
      `
        : `
      position: absolute;
      opacity: 1;
    transform: translateY(0);
    pointer-events: initial;
  `}
  }
`;

const CopiedMessage = styled.div`
  color: #000;
  padding: 1em 2em;

  background-color: #bada55;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const MainPlaylist = ({ id, playListOpen }) => {
  const { files } = useContext(MusicPageData);
  const [copied, setCopied] = useState(false);

  const { stopScroll, resumeScroll } = useScrollLock();

  useEffect(() => {
    playListOpen ? stopScroll() : resumeScroll();
  }, [playListOpen, stopScroll, resumeScroll]);

  useEffect(() => {
    let timer;

    copied &&
      (() => {
        timer = setTimeout(() => setCopied(false), 1500);
      })();

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <>
      <PlaylistDiv isOpen={playListOpen}>
        {files.map((file, index) => (
          <PlaylistItem
            key={index}
            file={file}
            index={index + 1}
            active={index === id}
            setCopied={setCopied}
          />
        ))}
      </PlaylistDiv>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: '-2rem',
            }}
            animate={{
              opacity: 1,
              y: '0rem',
            }}
            exit={{
              opacity: 0,
              y: '-2rem',
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '2rem',
              left: '50%',
              x: '-50%',
            }}
          >
            <CopiedMessage>Link copied to clipboard</CopiedMessage>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainPlaylist;
