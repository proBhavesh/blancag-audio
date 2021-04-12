import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translatex(-50%);

  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;

  width: 1.25rem;

  background-color: transparent;

  border: none;
  outline: none;

  &:hover {
    svg {
      fill: #bada55;
    }
  }

  svg {
    width: 100%;

    fill: #fff;
    transition: fill 0.25s linear;
  }
`;

export const CustomLeftArrow = ({ onClickHandler }) => {
  return (
    <Button
      className='arrow-btn'
      onClick={() => {
        onClickHandler('0');
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 53.16 87.96'
        transform='rotate(90)'
      >
        <polygon points='43.94 87.96 0 43.97 43.97 0 53.16 9.19 18.38 43.98 53.14 78.77 43.94 87.96' />
      </svg>
    </Button>
  );
};

export const CustomRightArrow = ({ onClickHandler }) => {
  return (
    <Button
      className='arrow-btn'
      onClick={() => {
        onClickHandler();
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 53.16 87.96'
        transform='rotate(-90)'
      >
        <polygon points='43.94 87.96 0 43.97 43.97 0 53.16 9.19 18.38 43.98 53.14 78.77 43.94 87.96' />
      </svg>
    </Button>
  );
};

const ButtonGroup = ({ nextFn, goTo, currentSlide, count }) => {
  return currentSlide + 3 >= count ? (
    <CustomLeftArrow onClickHandler={goTo} />
  ) : (
    <CustomRightArrow onClickHandler={nextFn} />
  );
};

export default ButtonGroup;
