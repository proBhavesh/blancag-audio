import React, { useContext } from 'react';
import styled from 'styled-components';

import ToolsSlider from './ToolsSlider/ToolsSlider';
import SkillCard from './SkillCard';

import { HomePageData } from '../../../containers/HomeContainer/index';
import HR from '../../HR';
import { Container } from '../../../hoc/Container';

const SkillsDiv = styled.div`
  margin: 2rem auto;
`;

const SkillsGrid = styled.div`
  width: 90%;
  margin: 2rem auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  column-gap: ${(props) => props.gap}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 2rem auto;
    row-gap: 2rem;
    width: 100%;
  }
`;

const Skills = () => {
  const {
    skills: {
      skillsContent,
      sizes: { gap },
    },
  } = useContext(HomePageData);

  return (
    <>
      <SkillsDiv>
        <Container>
          <h2>Skills</h2>
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
