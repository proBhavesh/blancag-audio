import React from 'react';
import styled from 'styled-components';

import Highlight from './Highlight';
import Content from './Content';
import Pic from './Pic';

import { Container } from '../../../hoc/Container';
import HR from '../../HR';

const AboutDiv = styled.div`
  margin: 2rem 0;
`;

const About = () => {
  return (
    <>
      <AboutDiv>
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
