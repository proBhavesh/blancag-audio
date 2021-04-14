import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import ContentDiv from '../../hoc/ContentDiv';
import { Container } from '../../hoc/Container';
import HR from '../../components/HR';
import Navbar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';

import MainPlayer from '../../components/MusicPageComponents/MainPlayer';

import { pageVariant } from '../../styles/motionVariants/pageVariant';

import { client as sanity } from '../../sanityClient';

export const MusicPageData = React.createContext({
  files: [],
  activeFileIndex: null,
  setActiveFileIndex: null,
});

const MusicPlayerDiv = styled.div`
  width: 100%;
  margin: 2rem auto;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
`;

const MusicPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeFileIndexState, setActiveFileIndexState] = useState(null);

  useEffect(() => {
    Promise.all([
      sanity.fetch(`*[_type == 'musicFiles'][0].music_files[]{
        'title': track_title,
        'cover': track_cover,
        'file': track_file.asset->.url,
        'id':_key
      }`),
    ]).then((res) => {
      setData(res[0]);
      setActiveFileIndexState(0);
      setIsLoading(false);
    });
  }, []);

  return (
    <ContentDiv>
      <Navbar />
      <motion.div
        variants={pageVariant}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        {!isLoading && (
          <>
            <Container>
              <MusicPageData.Provider
                value={{
                  files: data,
                  activeFileIndex: activeFileIndexState,
                  setActiveFileIndex: setActiveFileIndexState,
                }}
              >
                <MusicPlayerDiv>
                  <MainPlayer />
                  {data.map((d, i) => (
                    <h1 key={i}>{d.id}</h1>
                  ))}
                </MusicPlayerDiv>
              </MusicPageData.Provider>
            </Container>
            <HR />
            <Footer />
          </>
        )}
      </motion.div>
    </ContentDiv>
  );
};

export default MusicPage;
