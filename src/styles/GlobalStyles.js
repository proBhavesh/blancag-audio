import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 17px;
    width: 100%;
    position: relative;
    overflow-x: hidden;
  }

  body {
    background-color: ${(props) => props.theme.bgBlack};
    color: ${(props) => props.theme.textGrey};
    font-family: 'DIN Next Light', sans-serif;
    text-align: center;

    overflow-x: hidden;
    overflow-y: hidden;
    @media (max-width: 768px) {
      overflow-y: ${(props) => (props.safariMobile ? 'visible' : 'hidden')};
    }
  }

  h1,h2,h3 {
    color: ${(props) => props.theme.textWhite};
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

<<<<<<< HEAD
  svg,
  path,
=======
>>>>>>> 6dd320eb6f4ed851a0bb4811f60dbc124986de0c
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;
