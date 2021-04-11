import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Player from '@vimeo/player';

import ContentDiv from '../../hoc/ContentDiv';
import Navbar from '../../components/Nav/NavBar';

import { client as sanity } from '../../sanityClient';
import { pageVariant } from '../../styles/motionVariants/pageVariant';

export const DemosPageData = React.createContext({
  videos: [],
});

const DemosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  // const video01Player = useRef(null);

  useEffect(() => {
    Promise.all([sanity.fetch(`*[_type == 'demosPageVidLinks'][0].vidLinks`)])
      .then((res) => {
        return new Promise((resolve, reject) => {
          setData(res[0]);
          setIsLoading(false);
          resolve();
        });
      })
      .then(() => {
        new Player('video_01');
      });
  }, []);

  return (
    !isLoading && (
      <motion.div
        variants={pageVariant}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <ContentDiv>
          <Navbar />
          <div
            id='video_01'
            style={{ height: 500 }}
            data-vimeo-url={data[0]}
          ></div>
        </ContentDiv>
      </motion.div>
    )
  );
};

export default DemosPage;
