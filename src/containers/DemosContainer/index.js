import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

import {
  SampleNextArrow,
  SamplePrevArrow,
} from '../../components/DemoPageComponents/DesktopComponents/SliderArrow';

import ContentDiv from '../../hoc/ContentDiv';
import Navbar from '../../components/Nav/NavBar';
import BackHomeButton from '../../components/BackHomeButton';
import HR from '../../components/HR';
import Footer from '../../components/Footer/Footer';
import LoadingIndicator from '../../components/LoadingIndicator';

import ColorBallButton from '../../components/FxRelated/Chooser/ColorBallButton';
import FxWheel from '../../components/FxRelated/Chooser/FxWheel/index';
import ActiveFx from '../../components/FxRelated/FXes/ActiveFx';

import { client as sanity } from '../../sanityClient';

import useDocDims from '../../helpers/useDocDims';

import BackToTopButton from '../../components/DemoPageComponents/MobileComponents/BackToTopButton';
import VidPlayer from '../../components/DemoPageComponents/DesktopComponents/VidPlayer';
import VidLight from '../../components/DemoPageComponents/DesktopComponents/VidLight';
import VidDiv from '../../components/DemoPageComponents/MobileComponents/VidDiv';

export const DemosPageData = React.createContext({
  videos: [],
  activeVid_id: null,
  setActiveVid_id: null,
  sizes: {
    titles: {
      desktop: {
        mainPlayer: null,
        vidLight: null,
      },
      mobile: null,
    },
    icons: {
      desktop: {
        mainPlayer_playIcon: null,
        vidLight_playIcon: null,
        vidSlider_arrow: null,
      },
      mobile: {
        playIcon: null,
        backToTopButton: null,
      },
    },
  },
});

const ContainerDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;
  @media (max-width: 768px) {
    margin: 3.75rem auto 0;
    max-width: 500px;
  }

  font-family: 'Open Sans', sans-serif;
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

const DemosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);

  const [data, setData] = useState(null);
  const [sizesData, setSizesData] = useState(null);
  const [activeVid, setActiveVid] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = '#000';

    Promise.all([
      sanity.fetch(`*[_type == 'demosPageVidLinks'][0].vidLinks`),
      sanity.fetch(`*[_type == 'demosPageSizes'][0]{
        'titles': {
          'desktop': {
            'mainPlayer': mainPlayer_title_fontSize_desktop,
            'vidLight': vidLight_title_fontSize_desktop,
          },
          'mobile': vid_title_fontSize_mobile,
        },
        'icons': {
          'desktop': {
            'mainPlayer_playIcon': mainPlayer_playIcon_size_desktop,
            'vidLight_playIcon': vidLight_playIcon_size_desktop,
            'vidSlider_arrow': vidSlider_arrow_size_desktop,
          },
          'mobile': {
            'playIcon': vid_playIcon_size_mobile,
            'backToTopButton': backToTopButton_size_mobile
          },
        },
      }`),
    ])
      .then((res) => {
        setSizesData(res[1]);
        return Promise.all(
          res[0].map((link) =>
            fetch(
              `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
                link
              )}`
            )
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

  const width = useDocDims();

  const carouselSettingsDesktop = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Helmet>
        <title>blancagaudio | demos</title>
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
        <ContentDiv
          hideScroll={true}
          style={{ fontFamily: '"Open Sans",sans-serif' }}
        >
          {width < 769 && (
            <MobileNavDiv fixed={true}>
              <BackHomeButton />
            </MobileNavDiv>
          )}
          <DemosPageData.Provider
            value={{
              videos: data,
              activeVid_id: activeVid,
              setActiveVid_id: setActiveVid,
              sizes: sizesData,
            }}
          >
            {width > 768 && <Navbar />}
            <ContainerDiv>
              {width > 768 ? (
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
                <>
                  {data.map((d, i) => (
                    <VidDiv key={i} details={d} index={i + 1} />
                  ))}
                </>
              )}
            </ContainerDiv>
            {width > 768 && (
              <>
                <HR />
                <Footer />
              </>
            )}
            {width < 769 && <BackToTopButton />}
          </DemosPageData.Provider>
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

export default DemosPage;
