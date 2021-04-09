import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '../../components/Nav/NavBar';

import { pageVariant } from '../../styles/motionVariants/pageVariant';

const MusicPage = () => {
  return (
    <motion.div
      variants={pageVariant}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Navbar />
      <h1>Music</h1>
    </motion.div>
  );
};

export default MusicPage;
