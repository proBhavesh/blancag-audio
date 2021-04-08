import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { NavBarContext } from '../../context/NavbarContext';

const NavLinkStyled = styled(NavLink)`
  text-transform: uppercase;
  font-family: 'Play', monospace;
  text-decoration: none;
  font-size: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: ${(props) => props.size}px;
  }

  &:hover {
    color: #a6a6a6;
  }

  &.active {
    color: #bada55;
  }
`;

const NavLinks = () => {
  const { navLinkFontSize } = useContext(NavBarContext);

  return (
    <>
      <NavLinkStyled
        size={navLinkFontSize}
        to={{
          pathname: '/',
          redirected: true,
        }}
        exact={true}
      >
        Home
      </NavLinkStyled>
      <NavLinkStyled size={navLinkFontSize} to={{ pathname: '/demos' }}>
        Demos
      </NavLinkStyled>
      <NavLinkStyled size={navLinkFontSize} to={{ pathname: '/music' }}>
        Music
      </NavLinkStyled>
    </>
  );
};

export default NavLinks;
