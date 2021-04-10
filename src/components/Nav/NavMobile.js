import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useScrollLock from '../../helpers/useScrollLock';

import NavLinks from './NavLinks';

const MenuButton = styled.button`
  width: 2rem;
  height: 1.5rem;

  position: relative;

  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  z-index: 1000;

  display: block;
  margin: 0 auto;

  &:before,
  &:after {
    content: '';

    position: absolute;
    bottom: 0.65rem;
    left: 0;

    width: 100%;
    height: 2px;

    background-color: #fff;
    border-radius: 2px;

    transform-origin: center;
  }

  &:after {
    transform: translateY(0.65rem) rotate(0);

    ${(props) =>
      props.showCloseButton
        ? 'animation: transform-anim 0.6s ease normal forwards;'
        : props.clicked > 0 &&
          'animation: transform-anim-reverse 0.6s ease forwards;'}
  }

  @keyframes transform-anim {
    0% {
      transform: translateY(0.65rem) rotate(0);
    }

    50% {
      transform: translateY(0) rotate(0);
    }

    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }

  @keyframes transform-anim-reverse {
    0% {
      transform: translateY(0) rotate(-45deg);
    }

    50% {
      transform: translateY(0) rotate(0);
    }

    100% {
      transform: translateY(0.65rem) rotate(0);
    }
  }

  &:before {
    transition: transform 0.3s ease;
    ${(props) =>
      props.showCloseButton
        ? 'transform: rotate(45deg); transition-delay: 0.3s;'
        : 'transform: rotate(0); transition-delay: 0;'}
  }
`;

const MenuDiv = styled.div`
  position: absolute;
  top: 0;
  left: -2rem;

  width: calc(100% + 4rem);
  height: 100vh;

  background-color: #000;
  z-index: 990;

  display: grid;
  grid-auto-rows: max-content;

  place-items: center;
  row-gap: 4rem;
  font-size: 1.5rem;
  overflow-y: auto;

  padding: 225px 0 20vh;

  transition: 1s ease;
  ${(props) =>
    props.open
      ? `
    opacity:1;
    transform: translateY(0);
    pointer-events: initial;
  `
      : `
    opacity:0;
    transform: translateY(100%);
    pointer-events: none;
  `}
`;

const NavMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [clicked, setClicked] = useState(0);

  const { stopScroll, resumeScroll } = useScrollLock();

  useEffect(() => {
    openMenu ? stopScroll() : resumeScroll();
  }, [openMenu, stopScroll, resumeScroll]);

  return (
    <>
      <MenuButton
        onClick={() => {
          setClicked((prev) => prev + 1);
          setOpenMenu(!openMenu);
        }}
        showCloseButton={openMenu}
        clicked={clicked}
      />
      <MenuDiv open={openMenu}>
        <NavLinks />
      </MenuDiv>
    </>
  );
};

export default NavMobile;
