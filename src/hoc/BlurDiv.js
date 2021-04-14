import React from 'react';
import styled from 'styled-components';

const BlurDivDiv = styled.div`
  ${(props) =>
    props.blur
      ? `transition: filter 1s linear;
      filter: blur(5px) opacity(0.75);`
      : `transition: filter 0.5s linear;
      filter: blur(0)  opacity(1);`}
`;

const BlurDiv = ({ blur, children }) => {
  return <BlurDivDiv blur={blur}>{children}</BlurDivDiv>;
};

export default BlurDiv;
