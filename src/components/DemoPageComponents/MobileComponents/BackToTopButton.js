import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';
import smoothscroll from 'smoothscroll-polyfill';

import { DemosPageData } from '../../../containers/DemosContainer/index';

const IconDiv = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  display: grid;
  place-items: center;
  transition: opacity 0.25s ease;

  ${(props) =>
    props.show
      ? `
    opacity: 1;
    pointer-events: initial;
  `
      : `
    opacity:0;
    pointer-events:none;
  `}

  svg {
    width: 100%;
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    smoothscroll.polyfill();
    let timer;
    document
      .querySelector('.content-div')
      .addEventListener('touchmove', (e) => {
        if (timer !== undefined) {
          clearTimeout(timer);
        }

        setShow(true);

        timer = setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  }, [show]);

  return (
    <IconDiv onClick={scrollTop} show={show} size={size}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.01 10'>
        <path d='M9,0A1,1,0,0,0,8.3.29l-8,8a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0l0,0L9,2.41,16.28,9.7a1,1,0,1,0,1.45-1.39l0,0-8-8A1,1,0,0,0,9,0Z' />
      </svg>
    </IconDiv>
  );

  function scrollTop() {
    !isIOS
      ? document.querySelector('.content-div').scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      : document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
  }
};

export default BackToTopButton;
