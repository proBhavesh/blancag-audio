import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouteMatch, useLocation } from 'react-router-dom';

import ContentDiv from '../../hoc/ContentDiv';
import HR from '../../components/HR';
import Navbar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import BackHomeButton from '../../components/BackHomeButton';

import MainPlayer from '../../components/MusicPageComponents/Music/MainPlayer';
import MainPlaylist from '../../components/MusicPageComponents/Playlist/MainPlaylist';

import { pageVariant } from '../../styles/motionVariants/pageVariant';
import { loadingVariant } from '../../styles/motionVariants/loadingVariant';

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
  margin: 3rem auto;
  font-family: 'Open Sans', sans-serif;
  color: #fff;

  display: grid;

  @media (max-width: 768px) {
    height: auto;
    margin: ${(props) => (props.fixed ? '3rem' : '1rem')} auto 0;
  }
`;

const MobileNavDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  background-color: #000;
  ${(props) =>
    props.fixed &&
    `
  position: fixed;
  top: 0;
  left: 0;

  padding: 2rem 1.25rem 1rem;
  `}
  z-index: 100000;
`;

const PlaylistIconDiv = styled.div`
  height: 1.4rem;
  width: 1.4rem;
  z-index: 10000;

  svg {
    width: 100%;
    fill: #f5f5f5;
  }
`;

const MusicPage = () => {
  const match = useRouteMatch({
    path: '/music/:id',
    exact: true,
  });
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sizesData, setSizesData] = useState(null);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(1);

  const [playListOpen, setPlayListOpen] = useState(false);

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

  const mainContentJSX = (
    <>
      {window.innerWidth < 768 ? (
        <MobileNavDiv fixed={playListOpen}>
          <BackHomeButton />
          <PlaylistIconDiv onClick={() => setPlayListOpen((prev) => !prev)}>
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
            <MainPlayer id={match ? +match.params.id : 0} />
            <MainPlaylist
              id={match ? +match.params.id : 0}
              playListOpen={playListOpen}
              setPlayListOpen={setPlayListOpen}
            />
          </MusicPlayerDiv>
        </MusicPageData.Provider>
      </ContainerDiv>
      {window.innerWidth > 768 && (
        <>
          <HR />
          <Footer />
        </>
      )}
    </>
  );

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {isLoading && (
          <motion.div
            variants={loadingVariant}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <LoadingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          variants={pageVariant}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <ContentDiv hideScroll={true} style={{ padding: '1.25rem' }}>
            {!state || !state.redirect ? (
              <motion.div
                variants={pageVariant}
                initial='hidden'
                animate='visible'
                exit='hidden'
              >
                {mainContentJSX}
              </motion.div>
            ) : (
              mainContentJSX
            )}
          </ContentDiv>
        </motion.div>
      )}
    </>
  );
};

export default MusicPage;
