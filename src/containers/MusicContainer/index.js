import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import ContentDiv from '../../hoc/ContentDiv';
import HR from '../../components/HR';
import Navbar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import BackHomeButton from '../../components/BackHomeButton';

import MainPlayer from '../../components/MusicPageComponents/Music/MainPlayer';
// import MainPlaylist from '../../components/MusicPageComponents/Playlist/MainPlaylist';

import { pageVariant } from '../../styles/motionVariants/pageVariant';

import { client as sanity } from '../../sanityClient';

export const MusicPageData = React.createContext({
  files: [],
  activeFileIndex: null,
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

  @media (max-width: 768px) {
    margin: 1rem auto 2rem;
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

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    Promise.all([
      sanity.fetch(`*[_type == 'musicFiles'][0].music_files[]{
        'title': track_title,
        'cover': track_cover,
        'file': track_file.asset->.url,
      }`),
    ]).then((res) => {
      setData(res[0]);
      setIsLoading(false);
    });
  }, []);

  const mainContentJSX = (
    <>
      {window.innerWidth < 768 && <BackHomeButton />}
      {!isLoading && (
        <>
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
              }}
            >
              <MusicPlayerDiv>
                {match ? (
                  <MainPlayer id={+match.params.id} />
                ) : (
                  <MainPlayer id={0} />
                )}
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
      )}
    </>
  );

  return (
    <ContentDiv>
      {window.innerWidth > 768 && <Navbar />}
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
  );
};

export default MusicPage;
