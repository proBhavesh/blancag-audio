import React from 'react';
import styled from 'styled-components';

import NavLinks from './NavLinks';

const Nav = styled.nav`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const NavDesktop = () => {
  return (
    <Nav>
      <NavLinks />
    </Nav>
  );
};

export default NavDesktop;
