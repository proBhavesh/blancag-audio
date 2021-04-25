import React from 'react';
import styled from 'styled-components';

import { Container } from '../../hoc/Container';
import Logo from './Logo';
import HR from '../HR';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

import useDocDims from '../../helpers/useDocDims';

const Header = styled.header`
  margin-bottom: 1rem;
`;

const NavBar = () => {
  const width = useDocDims();
  return (
    <>
      <Header>
        <Container>
          <Logo />
          {width > 768 ? <NavDesktop /> : <NavMobile />}
        </Container>
      </Header>
      <HR />
    </>
  );
};

export default NavBar;
