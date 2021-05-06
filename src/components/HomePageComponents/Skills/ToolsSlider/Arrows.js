import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-63%);

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
      fill: white;
    }
  }

  svg {
    width: 100%;

    fill: ${(props) => props.theme.textGrey};
  }
`;

let timerPrev;
export const CustomLeftArrow = ({ onClickHandler }) => {
  return (
    <Button
      className='arrow-btn'
      onClick={() => {
        clearInterval(timerPrev);
        onClickHandler();
      }}
      onMouseEnter={() => {
        timerPrev = setInterval(onClickHandler, 10);
      }}
      onMouseLeave={() => clearInterval(timerPrev)}
      style={{ left: '-1.5rem' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 20'>
        <path d='M16,20l-.15-.16L6.61,10,16,0H9.39L1.68,8.24,0,10l1.68,1.76L9.35,20Z' />
      </svg>
    </Button>
  );
};

let timer;
export const CustomRightArrow = ({ onClickHandler }) => {
  return (
    <Button
      className='arrow-btn'
      onClick={() => {
        clearInterval(timer);
        onClickHandler();
      }}
      onMouseEnter={() => {
        timer = setInterval(onClickHandler, 10);
      }}
      onMouseLeave={() => clearInterval(timer)}
      style={{ right: '-1.5rem' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 20'>
        <path d='M0,0,.15.16,9.39,10,0,20H6.61l7.71-8.24L16,10,14.32,8.24,6.65,0Z' />
      </svg>
    </Button>
  );
};

const ButtonGroup = ({ nextFn, prevFn }) => {
  return (
    <>
      <CustomLeftArrow onClickHandler={prevFn} />
      <CustomRightArrow onClickHandler={nextFn} />
    </>
  );
};

export default ButtonGroup;
