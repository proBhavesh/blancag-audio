import React from 'react';
import styled from 'styled-components';

const HRStyled = styled.hr`
  border-color: #fff;
  border-style: solid;
  border-width: 0;
  border-top-width: 2px;

  width: 100vw;
  transform: translateX(-2rem);

  @media (max-width: 768px) {
    transform: translateX(-1.25rem);
  }
`;

const HR = () => {
  return <HRStyled />;
};

export default HR;
