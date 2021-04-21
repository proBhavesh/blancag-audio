import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const IconDiv = styled.div`
  position: fixed;
  right: 1.25rem;
  bottom: 1rem;

  width: 2rem;
  height: 2rem;

  display: grid;
  place-items: center;

  svg {
    width: 100%;
    fill: ${(props) => props.theme.textWhite};
  }
`;

const BackToTopButton = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer;
    document.querySelector('.content-div').addEventListener('scroll', (e) => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }

      setShow(true);

      timer = setTimeout(function () {
        setShow(false);
      }, 1500);
    });
  }, []);

  return (
    show && (
      <IconDiv onClick={scrollTop}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.01 10'>
          <path d='M9,0A1,1,0,0,0,8.3.29l-8,8a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0l0,0L9,2.41,16.28,9.7a1,1,0,1,0,1.45-1.39l0,0-8-8A1,1,0,0,0,9,0Z' />
        </svg>
      </IconDiv>
    )
  );

  function scrollTop() {
    document.querySelector('.content-div').scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export default BackToTopButton;
