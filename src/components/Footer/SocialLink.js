import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faVimeoV,
  faYoutube,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons';

import { FooterContext } from '../../context/FooterContext';

const A = styled.a`
  width: ${(props) => props.sizes.circleSizes.desktop}px;
  height: ${(props) => props.sizes.circleSizes.desktop}px;

  background-color: #fff;
  color: #000;
  border-radius: 50%;

  display: grid;
  place-items: center;

  padding-top: ${(props) => (props.extra ? '1px' : '0')};
  transition: background-color 0.3s linear;

  &:hover {
    background-color: #bada55;
  }
`;

const SocialLink = ({ url, type }) => {
  const { sizes } = useContext(FooterContext);
  let icon = null;
  const extra = type === 'vimeo' || type === 'youtube' ? true : false;

  switch (type) {
    case 'linkedIn':
      icon = <FontAwesomeIcon icon={faLinkedinIn} />;
      break;

    case 'vimeo':
      icon = <FontAwesomeIcon icon={faVimeoV} />;
      break;

    case 'youtube':
      icon = <FontAwesomeIcon icon={faYoutube} />;
      break;

    case 'soundCloud':
      icon = <FontAwesomeIcon icon={faSoundcloud} />;
      break;

    default:
      break;
  }

  return (
    <A sizes={sizes} href={url} target='_blank' extra={extra}>
      {icon}
    </A>
  );
};

export default SocialLink;
