import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ContentDiv from '../../hoc/ContentDiv';
import HR from '../../components/HR';
import Navbar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import BackHomeButton from '../../components/BackHomeButton';

import ColorBallButton from '../../components/FxRelated/Chooser/ColorBallButton';
import FxWheel from '../../components/FxRelated/Chooser/FxWheel/index';
import ActiveFx from '../../components/FxRelated/FXes/ActiveFx';

import MainPlayer from '../../components/MusicPageComponents/Music/MainPlayer';
import MainPlaylist from '../../components/MusicPageComponents/Playlist/MainPlaylist';

import useDocDims from '../../helpers/useDocDims';

import { client as sanity } from '../../sanityClient';
import LoadingIndicator from '../../components/LoadingIndicator';

export const MusicPageData = React.createContext({
  files: [],
  sizes: {
    mainPlayer: {
      title: {
        desktop: null,
        mobile: null,
      },
      byLine: {
        desktop: null,
        mobile: null,
      },
      duration: {
        desktop: null,
        mobile: null,
      },
      icons: {
        desktop: null,
        mobile: null,
      },
    },
    playlist: {
      title: {
        desktop: null,
        mobile: null,
      },
      durationMobile: null,
    },
  },
});

const ContainerDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const MusicPlayerDiv = styled.div`
  width: 100%;
  margin: 3rem auto 2.5rem;
  font-family: 'Open Sans', sans-serif;
  color: ${(props) => props.theme.textWhite};

  display: grid;

  @media (max-width: 768px) {
    height: auto;
    margin: ${(props) => (props.fixed ? '3.5rem' : '1.5rem')} auto 0;
  }
`;

const MobileNavDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.bgBlack};
  ${(props) =>
    props.fixed &&
    `
  position: fixed;
  top: 0;
  left: 0;

  padding: 1.5rem 1.25rem;
  `}
  z-index: 100000;
`;

const PlaylistIconDiv = styled.div`
  height: 1.4rem;
  width: 1.4rem;
  z-index: 10000;

  svg {
    width: 100%;
    fill: ${(props) => props.theme.textWhite};
  }
`;

const MusicPage = () => {
  const { search } = useLocation();
  const searchID = new URLSearchParams(search).get('id');

  const [isLoading, setIsLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);
  const [data, setData] = useState(null);
  const [sizesData, setSizesData] = useState(null);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(1);

  const [playListOpen, setPlayListOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      sanity.fetch(`*[_type == 'musicFiles'][0].music_files[]{
        'title': track_title,
        'cover': track_cover,
        'file': track_file.asset->.url,
      }`),
      sanity.fetch(`*[_type == 'musicPageSizes'][0]{
          'mainPlayer': {
            'title': {
              'desktop': mainPlayer_title_fontSize_desktop,
              'mobile': mainPlayer_title_fontSize_mobile
            },
            'byLine': {
              'desktop': mainPlayer_byLine_fontSize_desktop,
              'mobile': mainPlayer_byLine_fontSize_mobile,
            },
            'duration': {
              'desktop': mainPlayer_duration_fontSize_desktop,
              'mobile': mainPlayer_duration_fontSize_mobile
            },
            'icons': {
              'desktop': mainPlayer_icons_size_desktop,
              'mobile': mainPlayer_icons_size_mobile
            }
          },
          'playlist': {
            'title': {
              'desktop': playlist_fontSize_desktop,
              'mobile': playlist_title_fontSize_mobile,
            },
            'durationMobile': playlist_duration_fontSize_mobile
          }
      }`),
    ]).then((res) => {
      setData(res[0]);
      setSizesData(res[1]);
      setIsLoading(false);
    });
  }, []);

  const width = useDocDims();

  const mainContentJSX = (
    <>
      {width < 769 ? (
        <MobileNavDiv fixed={playListOpen}>
          <BackHomeButton />
          <PlaylistIconDiv
            className='icon-div'
            onClick={() => setPlayListOpen((prev) => !prev)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <defs>
                <style>
                  .a{'{'}fill-rule:evenodd;{'}'}
                </style>
              </defs>
              <title>playlist</title>
              <path
                className='a'
                d='M0,0V6.19l5-3.1ZM0,20H20V18H0Zm0-8.12H20v-2H0ZM7,3.75H20v-2H7Z'
              />
            </svg>
          </PlaylistIconDiv>
        </MobileNavDiv>
      ) : (
        <Navbar />
      )}
      <ContainerDiv>
        <MusicPageData.Provider
          value={{
            files: data,
            volume: volume,
            setVolume: setVolume,
            shuffle: shuffle,
            setShuffle: setShuffle,
            repeat: repeat,
            setRepeat: setRepeat,
            sizes: sizesData,
          }}
        >
          <MusicPlayerDiv fixed={playListOpen}>
            <MainPlayer id={+searchID || 0} />
            <MainPlaylist
              id={+searchID || 0}
              playListOpen={playListOpen}
              setPlayListOpen={setPlayListOpen}
            />
          </MusicPlayerDiv>
        </MusicPageData.Provider>
      </ContainerDiv>
      {width > 768 && (
        <>
          <HR />
          <Footer />
        </>
      )}
    </>
  );

  return (
    <>
      <Helmet>
        <title>blancagaudio | music</title>
      </Helmet>
      <AnimatePresence>
        {!showPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationStart={() =>
              setTimeout(() => {
                setShowPage(true);
              }, 1000)
            }
          >
            <LoadingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && showPage && (
        <ContentDiv hideScroll={true}>
          {mainContentJSX}
          {width > 768 && (
            <>
              <ColorBallButton isOpen={isOpen} setIsOpen={setIsOpen} />
              <FxWheel isOpen={isOpen} setIsOpen={setIsOpen} />
              <ActiveFx />
            </>
          )}
        </ContentDiv>
      )}
    </>
  );
};

export default MusicPage;
