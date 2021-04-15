import styled from 'styled-components';

export const IconDiv = styled.div`
  cursor: pointer;
  height: 1rem;

  svg {
    height: 100%;
    fill: #fff;
    transition: fill 0.25s linear;
  }

  &.active {
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
