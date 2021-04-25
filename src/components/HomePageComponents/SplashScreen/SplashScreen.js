import React from 'react';
import styled from 'styled-components';

import Avatar from '../../../assets/Avatar.png';

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

  background-color: ${(props) => props.theme.mainGreen};
  animation: green-anim 3s ease-out forwards;

  @keyframes green-anim {
    0% {
      transform: translatey(100%);
    }

    16.7% {
      transform: translatey(0);
    }

    83.33% {
      transform: translatey(0);
    }

    100% {
      transform: translatey(100%);
    }
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
  return (
    <SplashScreenDiv>
      <GreenDiv onAnimationEnd={() => setAnimation('done')} />
      <IMG src={Avatar} alt='avatar' />
    </SplashScreenDiv>
  );
};

export default SplashScreen;
