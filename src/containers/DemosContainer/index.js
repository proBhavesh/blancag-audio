import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

import {
  SampleNextArrow,
  SamplePrevArrow,
} from '../../components/DemoPageComponents/SliderArrow';

import ContentDiv from '../../hoc/ContentDiv';
import Navbar from '../../components/Nav/NavBar';
import HR from '../../components/HR';
import Footer from '../../components/Footer/Footer';

import { client as sanity } from '../../sanityClient';
import { pageVariant } from '../../styles/motionVariants/pageVariant';

import VidPlayer from '../../components/DemoPageComponents/DesktopComponents/VidPlayer';
import VidLight from '../../components/DemoPageComponents/DesktopComponents/VidLight';

export const DemosPageData = React.createContext({
  videos: [],
  activeVid_id: null,
  setActiveVid_id: null,
});

const ContainerDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;

  font-family: 'Open Sans', sans-serif;
`;

const DemosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeVid, setActiveVid] = useState(null);

  useEffect(() => {
    Promise.all([sanity.fetch(`*[_type == 'demosPageVidLinks'][0].vidLinks`)])
      .then((res) => {
        return Promise.all(
          res[0].map((link) =>
            fetch(`https://noembed.com/embed?url=${encodeURIComponent(link)}`)
          )
        );
      })
      .then((res) => {
        return Promise.all(res.map((response) => response.json()));
      })
      .then((data) => {
        setData(
          data.map((d) => {
            const { title, thumbnail_url, duration, video_id } = d;
            return {
              title,
              thumbnail_url,
              duration,
              video_id,
            };
          })
        );
        setActiveVid(data[0].video_id);
        setIsLoading(false);
      });
  }, []);

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
          <ContainerDiv>
            <DemosPageData.Provider
              value={{
                videos: data,
                activeVid_id: activeVid,
                setActiveVid_id: setActiveVid,
              }}
            >
              <VidPlayer activeVid={activeVid} />
              <div id='vid_slider'>
                <Slider {...carouselSettings}>
                  {data.map((d, i) => (
                    <VidLight key={i} details={d} index={i + 1} />
                  ))}
                </Slider>
              </div>
              {/* {console.log(sliderRef.current)} */}
            </DemosPageData.Provider>
          </ContainerDiv>
          <HR />
          <Footer />
        </ContentDiv>
      </motion.div>
    )
  );
};

export default DemosPage;
