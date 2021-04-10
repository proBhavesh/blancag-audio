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
    overflow: hidden;
    position: relative;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'DIN Next Light', sans-serif;
    text-align: center;

    width: 100%;
    height: 100%;
    overflow: hidden;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

  /* -- SCROLLBARS */
  /* html {
    scrollbar-width: thin;
    scrollbar-color: transparent #00000040;
    overflow-y: overlay;
  }

  ::-webkit-scrollbar {
    appearance: none;
    width: 8px;

    @media (max-width: 768px) {
      width: 4px;
    }
  }

  ::-webkit-scrollbar-track{
    background-color:transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bada55;
    border-radius: 2rem;
    border: 1px solid #a0a0a033;
    z-index: 10000;
  } */
`;
