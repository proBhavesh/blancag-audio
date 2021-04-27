import React, { useContext } from 'react';
import styled from 'styled-components';

import ToolsSlider from './ToolsSlider/ToolsSlider';
import SkillCard from './SkillCard';

import { HomePageData } from '../../../containers/HomeContainer/index';
import HR from '../../HR';
import { Container } from '../../../hoc/Container';

const SkillsDiv = styled.div`
  margin: 2rem auto;

  h2 {
    font-size: ${(props) => props.sizes.desktop}px;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobile}px;
    }
  }
`;

const SkillsGrid = styled.div`
  width: 90%;
  margin: 2rem auto 2.75rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  column-gap: ${(props) => props.gap}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 2rem auto;
    column-gap: 0;
    grid-auto-rows: auto;
    row-gap: 2rem;
    width: 100%;
    max-width: 500px;
  }
`;

const Skills = () => {
  const {
    skills: {
      skillsContent,
      sizes: { gap },
    },
    titleSizes,
  } = useContext(HomePageData);

  return (
    <>
      <SkillsDiv sizes={titleSizes}>
        <Container>
          <h2>Skills + Tools</h2>
          <ToolsSlider />
          <SkillsGrid gap={gap}>
            {skillsContent.map((skill, i) => (
              <SkillCard skill={skill} key={i} />
            ))}
          </SkillsGrid>
        </Container>
      </SkillsDiv>
      <HR />
    </>
  );
};

export default Skills;
