import styled from 'styled-components';

export const IconDiv = styled.div`
  position: relative;
  cursor: pointer;
  height: 1rem;

  svg {
    height: 100%;
    fill: #fff;
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

    background-color: ${(props) => props.theme.mainGreen};
  }

  &.active {
    &:before {
      opacity: 1;
    }

    svg {
      fill: ${(props) => props.theme.mainGreen};
    }
  }

  &:last-of-type {
    justify-self: end;
  }

  @media (min-width: 768px) {
    &:hover {
      svg {
        fill: ${(props) => props.theme.mainGreen};
      }
    }
  }
`;
