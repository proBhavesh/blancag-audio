import React, { useContext } from 'react';
import styled from 'styled-components';

import { Container } from '../../../hoc/Container';
import Headline from './HeadLine';
import HR from '../../HR';

import { HomePageData } from '../../../containers/HomeContainer/index';

const HeroDiv = styled.div`
  margin: 0.5rem auto;
  width: 100%;
  height: 15rem;

  position: relative;

  /* background-color: #ffffff80; */

  @media (max-width: 768px) {
    height: 10rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: -2rem;

  width: 100vw;
  height: 100%;

  background-color: ${(props) => props.theme.textColor}0d;
  mix-blend-mode: difference;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  max-width: 600px;

  object-fit: cover;
  object-position: center bottom;
`;

const Hero = () => {
  const {
    hero: { video },
  } = useContext(HomePageData);

  return (
    <>
      <HeroDiv>
        <Video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        ></Video>
        <Overlay />
        <Container>
          <Headline />
        </Container>
      </HeroDiv>
      <HR />
    </>
  );
};

export default Hero;
