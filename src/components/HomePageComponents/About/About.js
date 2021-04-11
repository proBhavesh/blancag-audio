import React, { useContext } from 'react';
import styled from 'styled-components';

import { HomePageData } from '../../../containers/HomeContainer/index';

import Highlight from './Highlight';
import Content from './Content';
import Pic from './Pic';

import { Container } from '../../../hoc/Container';
import HR from '../../HR';

const AboutDiv = styled.div`
  margin: 2rem 0;

  h2 {
    font-size: ${(props) => props.sizes.desktop}px;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobile}px;
    }
  }
`;

const About = () => {
  const { titleSizes } = useContext(HomePageData);

  return (
    <>
      <AboutDiv sizes={titleSizes}>
        <Container>
          <h2>About</h2>
          <Highlight />
          <Content />
          <Pic />
        </Container>
      </AboutDiv>
      <HR />
    </>
  );
};

export default About;
