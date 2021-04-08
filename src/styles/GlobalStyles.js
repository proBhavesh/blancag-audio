import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 17px;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'DIN Next Light', sans-serif;
    text-align: center;

    padding: 2.25rem;
  }

  h1,h2,h3 {
    color: ${(props) => props.theme.titleColor};
  }

  h2,h3 {
    font-family: 'Play',monospace;
    font-weight: normal;
  }

  h2 {
    text-transform:uppercase;
    letter-spacing:0.1em;
  }

  p {
    line-height: 1.5em;
  }
`;
