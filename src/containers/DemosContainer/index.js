import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

import ContentDiv from '../../hoc/ContentDiv';
import Navbar from '../../components/Nav/NavBar';

import { client as sanity } from '../../sanityClient';
import { pageVariant } from '../../styles/motionVariants/pageVariant';

import VidLight from '../../components/DemoPageComponents/VidLight';

export const DemosPageData = React.createContext({
  videos: [],
  activeVid_id: null,
  setActiveVid_id: null,
});

const ContainerDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  font-family: 'Open Sans', sans-serif;
`;

const IconDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;

  width: 2rem;
  height: 2rem;

  &:first-of-type {
    left: -2.5rem;
  }

  &:last-of-type {
    right: -2.5rem;
  }

  svg {
    fill: #a6a6a6;
    height: 100%;
    transition: fill 0.3s linear;
  }

  &:hover {
    svg {
      fill: #bada55;
    }
  }
`;

function SamplePrevArrow({ currentSlide, onClick }) {
  return (
    <IconDiv
      className='iconDiv'
      style={
        currentSlide === 0
          ? { opacity: 0, pointerEvents: 'none' }
          : {
              opacity: 1,
              pointerEvents: 'initial',
              transition: 'opacity 0.5 ease',
            }
      }
      onClick={() => onClick()}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53.16 87.96'>
        <polygon points='43.94 87.96 0 43.97 43.97 0 53.16 9.19 18.38 43.98 53.14 78.77 43.94 87.96' />
      </svg>
    </IconDiv>
  );
}
function SampleNextArrow({ currentSlide, onClick, slideCount }) {
  return (
    <IconDiv
      className='iconDiv'
      style={
        currentSlide + 3 >= slideCount - 1
          ? { opacity: 0, pointerEvents: 'none' }
          : {
              opacity: 1,
              pointerEvents: 'initial',
              transition: 'opacity 0.5 ease',
            }
      }
      onClick={() => onClick()}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53.16 87.96'>
        <polygon points='9.22 0 53.16 43.99 9.19 87.96 0 78.77 34.78 43.98 0.02 9.19 9.22 0' />
      </svg>
    </IconDiv>
  );
}

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
        </ContentDiv>
      </motion.div>
    )
  );
};

export default DemosPage;
