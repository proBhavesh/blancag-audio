import React from 'react';
import styled from 'styled-components';

const ConatinerDiv = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Container = ({ children }) => {
  return <ConatinerDiv>{children}</ConatinerDiv>;
};
