import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { NavBarContext } from '../../context/NavbarContext';

const NavLinkStyled = styled(NavLink)`
  text-transform: uppercase;
  font-family: 'Play', monospace;
  text-decoration: none;
  font-size: 1rem;
  color: ${(props) => props.theme.textWhite};

  @media (max-width: 768px) {
    font-size: ${(props) => props.size}px;
  }

  @media (min-width: 768px) {
    &:hover {
      color: ${(props) => props.theme.textGrey};
    }
  }

  &.active {
    color: ${(props) => props.theme.mainGreen};
  }
`;

const NavLinks = ({ resumeScroll }) => {
  const { navLinkFontSize } = useContext(NavBarContext);

  return (
    <>
      <NavLinkStyled
        onClick={() => resumeScroll && resumeScroll()}
        size={navLinkFontSize}
        to={{
          pathname: '/',
          redirected: true,
        }}
        exact={true}
      >
        Home
      </NavLinkStyled>
      <NavLinkStyled
        onClick={() => resumeScroll && resumeScroll()}
        size={navLinkFontSize}
        to={{ pathname: '/demos' }}
      >
        Demos
      </NavLinkStyled>
      <NavLinkStyled
        onClick={() => resumeScroll && resumeScroll()}
        size={navLinkFontSize}
        to={{ pathname: '/music', state: { redirect: false } }}
      >
        Music
      </NavLinkStyled>
    </>
  );
};

export default NavLinks;
