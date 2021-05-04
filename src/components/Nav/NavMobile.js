import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

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

    background-color: ${(props) => props.theme.textWhite};
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

const MenuDiv = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.bgBlack};
  z-index: 990;

  display: grid;
  grid-auto-rows: max-content;

  place-items: center;
  row-gap: 4rem;
  font-size: 1.5rem;
  overflow-y: hidden;

  padding: 225px 0 calc(var(--vh, 1vh) * 20);

  @media (max-width: 768px) and (orientation: landscape) {
    grid-template-columns: repeat(3, 1fr);
  }
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
          setOpenMenu((prev) => !prev);
        }}
        className='icon-div'
        showCloseButton={openMenu}
        clicked={clicked}
      />
      <AnimatePresence>
        {openMenu && (
          <MenuDiv
            initial={{ y: '100%', opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.35,
                ease: 'linear',
              },
            }}
            exit={{
              y: '100%',
              opacity: 0,
              transition: { duration: 0.5, ease: 'linear' },
            }}
          >
            <NavLinks resumeScroll={resumeScroll} />
          </MenuDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMobile;
