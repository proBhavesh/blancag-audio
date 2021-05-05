import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';

import { DemosPageData } from '../../../containers/DemosContainer/index';

const IconDiv = styled.div`
  margin: 0 auto;
  width: 25%;

  display: grid;
  place-items: center;
  transition: opacity 0.25s ease;

  svg {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    fill: ${(props) => props.theme.textWhite};
  }
`;

const BackToTopButton = () => {
  const {
    sizes: {
      icons: {
        mobile: { backToTopButton: size },
      },
    },
  } = useContext(DemosPageData);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <IconDiv className='icon-div' onClick={scrollTop} size={size}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.01 10'>
        <path d='M9,0A1,1,0,0,0,8.3.29l-8,8a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0l0,0L9,2.41,16.28,9.7a1,1,0,1,0,1.45-1.39l0,0-8-8A1,1,0,0,0,9,0Z' />
      </svg>
    </IconDiv>
  );

  function scrollTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export default BackToTopButton;
