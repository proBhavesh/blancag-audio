import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { SplashScreenContext } from '../../../context/SplashScreenContext';

import useDocDims from '../../../helpers/useDocDims';

import Avatar from '../../../assets/Avatar.png';

const SplashScreenDiv = styled.div`
  position: fixed;
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
  height: calc(100% + 200px);

  margin-top: -200px;

  @media (max-width: 768px) {
    width: 200%;
  }

  background: ${(props) => props.theme.mainGreen};
  animation: green-anim 2s ease-out forwards;
  clip-path: url(#wave);

  @keyframes green-anim {
    0% {
      transform: translatey(0%);
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
  width: ${(props) => props.sizes.desktop}%;
  z-index: 1000000;

  @media (max-width: 768px) {
    width: ${(props) => props.sizes.mobile}%;
  }

  opacity: 0;

  animation: img-anim 2s ease forwards;

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
  const { desktop, mobile } = useContext(SplashScreenContext);
  const width = useDocDims();

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, []);

  return (
    <>
      <SplashScreenDiv>
        <GreenDiv
          onAnimationEnd={() => {
            setAnimation('done');
            document.documentElement.style.overflow = 'initial';
          }}
        />
        <IMG src={Avatar} alt='avatar' sizes={{ desktop, mobile }} />
      </SplashScreenDiv>
      {width > 768 ? (
        <svg height='0' width='0' style={{ position: 'absolute' }}>
          <defs>
            <clipPath id='wave' clipPathUnits='objectBoundingBox'>
              <path d='M0.9875,0.0769C0.9944,0.0769,1,0.0712,1,0.0641V1H0V0.0641c0,0.0071,0.0056,0.0128,0.0125,0.0128 c0.0455,0,0.069-0.0222,0.0898-0.0418C0.1221,0.0162,0.1393,0,0.1751,0C0.2109,0,0.228,0.0162,0.2479,0.0351 c0.0207,0.0196,0.0442,0.0418,0.0897,0.0418c0.0455,0,0.069-0.0222,0.0897-0.0418C0.4472,0.0162,0.4644,0,0.5001,0 S0.553,0.0162,0.5729,0.0351c0.0208,0.0196,0.0443,0.0418,0.0897,0.0418c0.0455,0,0.069-0.0222,0.0897-0.0418 C0.7722,0.0162,0.7894,0,0.8251,0C0.8608,0,0.878,0.0162,0.8978,0.0351C0.9185,0.0547,0.942,0.0769,0.9875,0.0769z' />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          height='0'
          width='0'
          style={{ position: 'absolute' }}
          viewBox='0 0 0.5 1'
        >
          <defs>
            <clipPath id='wave' clipPathUnits='objectBoundingBox'>
              <path
                d='M481.4441,280.5119a.0535.0535,0,0,0-.0673,0,.0769.0769,0,0,1-.0931,0,.0535.0535,0,0,0-.0673,0,.0769.0769,0,0,1-.0931,0,.0535.0535,0,0,0-.0673,0,.0725.0725,0,0,1-.0466.0157c-.0052,0-.0094-.0031-.0094-.0069V281.5h.5v-.9793c0,.0038-.0042.0069-.0094.0069A.0724.0724,0,0,1,481.4441,280.5119Z'
                transform='translate(-481 -280.5)'
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};

export default SplashScreen;
