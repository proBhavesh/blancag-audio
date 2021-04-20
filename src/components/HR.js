import React from 'react';
import styled from 'styled-components';

const HRStyled = styled.hr`
  border-color: ${(props) => props.theme.textWhite};
  border-style: solid;
  border-width: 0;
  border-top-width: 2px;

  width: calc(100vw - 16px);
  transform: translateX(calc(-2rem + 8px));

  @media (max-width: 768px) {
    width: 100vw;
    transform: translateX(-1.25rem);
  }
`;

const HR = () => {
  return <HRStyled />;
};

export default HR;
