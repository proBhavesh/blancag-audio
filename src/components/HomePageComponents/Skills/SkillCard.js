import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';

import { urlFor } from '../../../helpers/ImageUrlGetter';

import { HomePageData } from '../../../containers/HomeContainer/index';

const SkillCardDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    &:nth-of-type(1),
    &:nth-of-type(3) {
      margin-top: -2rem;
    }
  }
`;

const SkillImageDiv = styled.div`
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;

  width: ${(props) => props.sizes.desktop}%;
  height: ${(props) => (props.widthProp ? `${props.widthProp}px` : 'auto')};

  @media (max-width: 786px) {
    width: ${(props) => props.sizes.mobile}%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SkillTitle = styled.h3`
  margin-bottom: 1.25rem;
  font-size: ${(props) => props.sizes.desktop}px;

  @media (max-width: 768px) {
    font-size: ${(props) => props.sizes.mobile}px;
  }
`;

const SkillContent = styled.div`
  p {
    font-size: ${(props) => props.sizes.desktop}px;
    max-width: 100%;

    @media (max-width: 768px) {
      font-size: ${(props) => props.sizes.mobile}px;
      width: ${(props) => props.sizes.width}%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const SkillCard = ({ skill }) => {
  const [width, setWidth] = useState(null);
  const imageDivRef = useRef(null);
  const {
    skills: {
      sizes: { titleSizes, imageSizes, contentSizes },
    },
  } = useContext(HomePageData);

  useEffect(() => {
    setWidth(
      Math.round(
        +getComputedStyle(imageDivRef.current)
          .getPropertyValue('width')
          .split('')
          .slice(0, -2)
          .join('')
      )
    );
  }, []);

  return (
    <SkillCardDiv>
      <SkillImageDiv ref={imageDivRef} widthProp={width} sizes={imageSizes}>
        {width && (
          <img
            src={urlFor(skill.image)
              .width(width)
              .height(width)
              .dpr(window.devicePixelRatio)
              .url()}
            alt='skill'
          />
        )}
      </SkillImageDiv>
      <SkillTitle sizes={titleSizes}>{skill.title}</SkillTitle>
      <SkillContent sizes={contentSizes}>
        <BlockContent blocks={skill.text} />
      </SkillContent>
    </SkillCardDiv>
  );
};

export default SkillCard;
