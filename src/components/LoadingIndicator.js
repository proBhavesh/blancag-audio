import React, { useContext } from 'react';
import styled from 'styled-components';

import { LoadingIndicatorContext } from '../context/LoadingIndicatorContext';

import UFO from '../assets/Loading UFO.gif';

const LoadingDiv = styled.div`
  background-color: transparent;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  display: grid;
  place-items: center;

  img {
    width: ${(props) => props.sizes.desktop}%;

    @media (max-width: 768px) {
      width: ${(props) => props.sizes.mobile}%;
    }
  }
`;

const LoadingIndicator = () => {
  const { desktop, mobile } = useContext(LoadingIndicatorContext);
  return (
    <LoadingDiv sizes={{ desktop, mobile }}>
      <img src={UFO} alt='loading' />
    </LoadingDiv>
  );
};

export default LoadingIndicator;
