import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '../../components/Nav/NavBar';

import { pageVariant } from '../../styles/motionVariants/pageVariant';

const DemosPage = () => {
  return (
    <motion.div
      variants={pageVariant}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Navbar />
      <h1>Demos</h1>
    </motion.div>
  );
};

export default DemosPage;
