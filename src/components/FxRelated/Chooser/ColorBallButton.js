import React, { useContext } from 'react';
import styled from 'styled-components';

import { FxContext } from '../../../context/FxContext';

// import ColorBallIMG from '../../../assets/color-ball.gif';
import fxButtonGif from '../../../assets/fxButtonGif.gif';

const ColorBall = styled.button`
  position: fixed;
  bottom: 1.25rem;
  right: calc(1.25rem + 8px);
  z-index: 10;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  box-shadow: 0 1px 2px 0 ${(props) => props.theme.bgBlack},
    0 1px 4px 0 ${(props) => props.theme.textGrey}bf;

  overflow: hidden;

  width: ${(props) => props.sizes.desktop}px;
  height: ${(props) => props.sizes.desktop}px;

  border-radius: 50%;

  @media (max-width: 768px) {
    width: ${(props) => props.sizes.mobile}px;
    height: ${(props) => props.sizes.mobile}px;
    bottom: 0.5rem;
    left: 0.5rem;
    right: unset;
  }

  @media (min-width: 769px) {
    transition: all 0.25s;
    &:hover {
      transform: scale(1.2);
      opacity: 0.8;
    }
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
