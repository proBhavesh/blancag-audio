import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

import {
  SampleNextArrow,
  SamplePrevArrow,
} from '../../components/DemoPageComponents/DesktopComponents/SliderArrow';
import ButtonGroup from '../../components/DemoPageComponents/MobileComponents/Arrows';

import ContentDiv from '../../hoc/ContentDiv';
import Navbar from '../../components/Nav/NavBar';
import BackHomeButton from '../../components/BackHomeButton';
import HR from '../../components/HR';
import Footer from '../../components/Footer/Footer';

import { client as sanity } from '../../sanityClient';
import { pageVariant } from '../../styles/motionVariants/pageVariant';

import VidPlayer from '../../components/DemoPageComponents/DesktopComponents/VidPlayer';
import VidLight from '../../components/DemoPageComponents/DesktopComponents/VidLight';
import VidDiv from '../../components/DemoPageComponents/MobileComponents/VidDiv';

export const DemosPageData = React.createContext({
  videos: [],
  activeVid_id: null,
  setActiveVid_id: null,
});

const ContainerDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;
  @media (max-width: 768px) {
    margin: 1rem auto 2rem;
  }

  font-family: 'Open Sans', sans-serif;
`;

const NoArrow = () => {
  return <div style={{ display: 'none' }} />;
};

const DemosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeVid, setActiveVid] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const carouselSettingsDesktop = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const carouselSettingsMobile = {
    ...carouselSettingsDesktop,
    vertical: true,
    verticalSwiping: true,
    afterChange: (index) => setCurrentSlide(index),
    nextArrow: <NoArrow />,
    prevArrow: <NoArrow />,
  };

  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const goTo = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <ContentDiv>
      {window.innerWidth > 768 ? <Navbar /> : <BackHomeButton />}
      {!isLoading && (
        <motion.div
          variants={pageVariant}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <ContainerDiv>
            <DemosPageData.Provider
              value={{
                videos: data,
                activeVid_id: activeVid,
                setActiveVid_id: setActiveVid,
              }}
            >
              {window.innerWidth > 768 ? (
                <>
                  <VidPlayer activeVid={activeVid} />
                  <div id='vid_slider'>
                    <Slider {...carouselSettingsDesktop}>
                      {data.map((d, i) => (
                        <VidLight key={i} details={d} index={i + 1} />
                      ))}
                    </Slider>
                  </div>
                </>
              ) : (
                <div id='vid_slider_mobile' style={{ position: 'relative' }}>
                  <Slider {...carouselSettingsMobile} ref={sliderRef}>
                    {data.map((d, i) => (
                      <VidDiv key={i} details={d} index={i + 1} />
                    ))}
                  </Slider>
                  <ButtonGroup
                    nextFn={next}
                    goTo={goTo}
                    currentSlide={currentSlide}
                    count={data.length}
                  />
                </div>
              )}
            </DemosPageData.Provider>
          </ContainerDiv>
          {window.innerWidth > 768 && (
            <>
              <HR />
              <Footer />
            </>
          )}
        </motion.div>
      )}
    </ContentDiv>
  );
};

export default DemosPage;
