import React, { useContext } from 'react';
import styled from 'styled-components';

import { FxContext } from '../../../context/FxContext';

// import ColorBallIMG from '../../../assets/color-ball.gif';
import fxButtonGif from '../../../assets/fxButtonGif.gif';

const ColorBall = styled.button`
  position: fixed;
  top: 0.3rem;
  left: 0.5rem;
  z-index: 10;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  overflow: hidden;

  width: ${(props) => props.sizes.desktop}px;
  height: ${(props) => props.sizes.desktop}px;

  border-radius: 50%;

  @media (max-width: 768px) {
    width: ${(props) => props.sizes.mobile}px;
    height: ${(props) => props.sizes.mobile}px;
    bottom: 0.5rem;
    left: 0.5rem;
    top: unset;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const ColorBallButton = ({ isOpen, setIsOpen }) => {
  const {
    sizes: {
      chooser: {
        colorBall: { desktop, mobile },
      },
    },
  } = useContext(FxContext);

  return (
    <ColorBall
      blur={isOpen}
      sizes={{ desktop, mobile }}
      onClick={() => setIsOpen(true)}
    >
      <img src={fxButtonGif} alt='open fxChooser' />
    </ColorBall>
  );
};

export default ColorBallButton;
