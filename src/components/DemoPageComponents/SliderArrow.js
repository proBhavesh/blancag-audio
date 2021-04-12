import React from 'react';
import styled from 'styled-components';

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

export function SamplePrevArrow({ currentSlide, onClick }) {
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
export function SampleNextArrow({ currentSlide, onClick, slideCount }) {
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
