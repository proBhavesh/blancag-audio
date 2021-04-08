import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';
import '../../../../../node_modules/slick-carousel/slick/slick.css';

import { HomePageData } from '../../../../containers/HomeContainer/index';
import ButtonGroup from './Arrows';

import { urlFor } from '../../../../helpers/ImageUrlGetter';

import './slider.css';

const ToolsDiv = styled.div`
  width: 25%;
  margin: 2rem auto;
  position: relative;

  @media (max-width: 769px) {
    width: 75%;
  }
`;

const IMG = styled.img`
  display: inline-block;
  height: 40px;
  object-fit: contain;
`;

function SamplePrevArrow() {
  return <div style={{ display: 'none' }} />;
}
function SampleNextArrow() {
  return <div style={{ display: 'none' }} />;
}

const ToolsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const {
    skills: { toolsPics },
  } = useContext(HomePageData);

  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const prev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <ToolsDiv>
      <Slider {...settings} ref={sliderRef}>
        {toolsPics.map((pic, index) => (
          <IMG
            src={urlFor(pic)
              .auto('format')
              .height(100)
              .dpr(window.devicePixelRatio)
              .url()}
            alt='tools'
            key={index}
          />
        ))}
      </Slider>
      <ButtonGroup nextFn={next} prevFn={prev} />
    </ToolsDiv>
  );
};

export default ToolsSlider;
