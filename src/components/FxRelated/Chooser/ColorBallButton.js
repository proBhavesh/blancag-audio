import React, { useContext } from 'react';
import styled from 'styled-components';

import { FxContext } from '../../../context/FxContext';

import ColorBallIMG from '../../../assets/color-ball.gif';

const ColorBall = styled.button`
  position: fixed;
  top: 0.3rem;
  left: 0.5rem;
  z-index: 10;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  transition: filter 0.5s ease;
  filter: ${(props) => props.blur && `blur(5px) opacity(0.75)`};
  pointer-events: ${(props) => props.blur && `none`};

  width: ${(props) => props.sizes.desktop}px;
  height: ${(props) => props.sizes.desktop}px;

  border-radius: 50%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: -1;
    filter: blur(15px);
  }

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
    object-fit: cover;
    z-index: 5;
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
      <img src={ColorBallIMG} alt='FxChooser' />
    </ColorBall>
  );
};

export default ColorBallButton;
