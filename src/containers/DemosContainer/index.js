import React from 'react';
import { motion } from 'framer-motion';

import ContentDiv from '../../hoc/ContentDiv';
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
      <ContentDiv>
        <Navbar />
      </ContentDiv>
    </motion.div>
  );
};

export default DemosPage;
