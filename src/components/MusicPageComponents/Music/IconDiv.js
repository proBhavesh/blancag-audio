import styled from 'styled-components';

export const IconDiv = styled.div`
  position: relative;
  cursor: pointer;
  height: 1rem;

  svg {
    height: 100%;
    fill: #fff;
    transition: fill 0.25s linear;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translatex(-50%);

    height: 5px;
    width: 5px;
    border-radius: 50%;

    opacity: 0;
    transition: opacity 0.25s linear;

    background-color: ${(props) => props.theme.mainGreen};
  }

  &.active {
    &:before {
      opacity: 1;
    }

    svg {
      fill: #bada55;
    }
  }

  &:last-of-type {
    justify-self: end;
  }

  @media (min-width: 768px) {
    &:hover {
      svg {
        fill: #bada55;
      }
    }
  }
`;
