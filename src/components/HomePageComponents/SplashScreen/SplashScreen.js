import React, { useState } from 'react';
import styled from 'styled-components';

import Avatar from '../../../assets/Avatar.png';
import GreenGif from '../../../assets/splash screen gif.gif';

const SplashScreenDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  display: grid;
  place-items: center;

  background-color: transparent;

  z-index: 10000;

  overflow: hidden;
`;

const GreenDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IMG = styled.img`
  width: 15%;
  z-index: 1000000;

  @media (max-width: 768px) {
    width: 50%;
  }

  opacity: 0;

  animation: img-anim 2.3s ease forwards 0.5s;
  animation-play-state: ${(props) => (props.loaded ? 'running' : 'paused')};

  @keyframes img-anim {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    8.7% {
      opacity: 1;
      transform: scale(1);
    }

    87.5% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
`;

const SplashScreen = ({ setAnimation }) => {
  const [loaded, setLoaded] = useState([false, false]);
  return (
    <SplashScreenDiv>
      {/* <GreenDiv loaded={loaded} onAnimationEnd={() => setAnimation('done')} /> */}
      <GreenDiv>
        <img
          loaded={loaded.reduce((prev, item) => item && prev, true)}
          src={GreenGif}
          alt='green-gif'
          onLoad={() =>
            setLoaded((prev) => prev.map((item, i) => (i === 0 ? true : item)))
          }
        />
      </GreenDiv>
      <IMG
        loaded={loaded.reduce((prev, item) => item && prev, true)}
        src={Avatar}
        alt='avatar'
        onLoad={() =>
          setLoaded((prev) => prev.map((item, i) => (i === 1 ? true : item)))
        }
        onAnimationEnd={() => setTimeout(() => setAnimation('done'), 250)}
      />
    </SplashScreenDiv>
  );
};

export default SplashScreen;
