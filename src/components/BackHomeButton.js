import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IconDiv = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  z-index: 10000;

  svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  ${(props) =>
    props.fixed &&
    `
    position: fixed;
    top: 0;
    left: 1.25rem;

    width: 100%;
    height: auto;
    padding: 1rem 0;

    background-color: #000;

    display: flex;

    svg {
      height: 2rem;
      width: auto;
    }
  `}
`;

const BackHomeButton = ({ fixed }) => {
  return (
    <IconDiv fixed={fixed}>
      <Link to={{ pathname: '/', redirected: true }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 17'>
          <path d='M21,9.68a.51.51,0,0,1-.47.32H18v6.5a.5.5,0,0,1-.5.5h-5a.5.5,0,0,1-.5-.5V12H9v4.5a.5.5,0,0,1-.5.5h-5a.5.5,0,0,1-.5-.5V10H.5A.51.51,0,0,1,0,9.68a.49.49,0,0,1,.14-.55l10-9a.49.49,0,0,1,.66,0l10,9A.49.49,0,0,1,21,9.68Z' />
        </svg>
      </Link>
    </IconDiv>
  );
};

export default BackHomeButton;
