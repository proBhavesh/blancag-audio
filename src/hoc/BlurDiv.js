import React from 'react';
import styled from 'styled-components';

const BlurDivDiv = styled.div`
  transition: opacity 0.25s linear;
  opacity: ${(props) => (props.blur ? 0.25 : 1)};
`;

const BlurDiv = ({ blur, children }) => {
  return <BlurDivDiv blur={blur}>{children}</BlurDivDiv>;
};

export default BlurDiv;
