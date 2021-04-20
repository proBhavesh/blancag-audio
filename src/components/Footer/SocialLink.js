import React, { useContext } from 'react';
import styled from 'styled-components';

import { FooterContext } from '../../context/FooterContext';

const A = styled.a`
  width: ${(props) => props.sizes.circleSizes.desktop}px;
  height: ${(props) => props.sizes.circleSizes.desktop}px;
  margin: 0 ${(props) => props.sizes.gap}px;

  display: grid;
  place-items: center;

  svg,
  .soundCloud-circle {
    fill: ${(props) => props.theme.textWhite};
  }

  @media (min-width: 768px) {
    &:hover {
      svg,
      .soundCloud-circle {
        fill: ${(props) => props.theme.mainGreen};
      }
    }
  }

  @media (max-width: 768px) {
    width: ${(props) => props.sizes.circleSizes.mobile}px;
    height: ${(props) => props.sizes.circleSizes.mobile}px;
  }
`;

const SocialLink = ({ url, type }) => {
  const { sizes } = useContext(FooterContext);
  let icon = null;

  switch (type) {
    case 'linkedIn':
      icon = (
        <svg
          height='100%'
          style={{
            fillRule: 'evenodd',
            clipRrule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: 2,
          }}
          viewBox='0 0 512 512'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-80.037,399.871l0,-199.921l-66.464,0l0,199.921l66.464,0Zm239.62,0l0,-114.646c0,-61.409 -32.787,-89.976 -76.509,-89.976c-35.255,0 -51.047,19.389 -59.889,33.007l0,-28.306l-66.447,0c0.881,18.757 0,199.921 0,199.921l66.446,0l0,-111.65c0,-5.976 0.43,-11.95 2.191,-16.221c4.795,-11.935 15.737,-24.299 34.095,-24.299c24.034,0 33.663,18.34 33.663,45.204l0,106.966l66.45,0Zm-272.403,-296.321c-22.74,0 -37.597,14.95 -37.597,34.545c0,19.182 14.405,34.544 36.717,34.544l0.429,0c23.175,0 37.6,-15.362 37.6,-34.544c-0.43,-19.595 -14.424,-34.545 -37.149,-34.545Z' />
        </svg>
      );
      break;

    case 'vimeo':
      icon = (
        <svg
          height='100%'
          style={{
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: 2,
          }}
          viewBox='0 0 512 512'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm143.233,205.824c-1.335,29.198 -21.728,69.178 -61.183,119.928c-40.787,52.999 -75.299,79.505 -103.521,79.505c-17.491,0 -32.29,-16.131 -44.377,-48.418c-8.071,-29.596 -16.135,-59.188 -24.213,-88.783c-8.977,-32.266 -18.605,-48.422 -28.904,-48.422c-2.245,0 -10.098,4.722 -23.545,14.128l-14.111,-18.176c14.807,-13.007 29.409,-26.011 43.776,-39.039c19.747,-17.055 34.581,-26.029 44.461,-26.936c23.341,-2.245 37.711,13.714 43.104,47.869c5.83,36.853 9.867,59.775 12.129,68.742c6.739,30.582 14.146,45.855 22.227,45.855c6.272,0 15.709,-9.918 28.291,-29.761c12.555,-19.826 19.283,-34.917 20.193,-45.288c1.796,-17.117 -4.94,-25.693 -20.193,-25.693c-7.185,0 -14.591,1.65 -22.209,4.916c14.747,-48.284 42.918,-71.732 84.49,-70.397c30.827,0.907 45.367,20.895 43.585,59.97Z' />
        </svg>
      );
      break;

    case 'youtube':
      icon = (
        <svg
          height='100%'
          style={{
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: 2,
          }}
          viewBox='0 0 512 512'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm153.315,178.978c-3.68,-13.769 -14.522,-24.61 -28.29,-28.29c-24.958,-6.688 -125.025,-6.688 -125.025,-6.688c0,0 -100.067,0 -125.025,6.688c-13.765,3.68 -24.61,14.521 -28.29,28.29c-6.685,24.955 -6.685,77.024 -6.685,77.024c0,0 0,52.067 6.685,77.02c3.68,13.769 14.525,24.614 28.29,28.293c24.958,6.685 125.025,6.685 125.025,6.685c0,0 100.067,0 125.025,-6.685c13.768,-3.679 24.61,-14.524 28.29,-28.293c6.685,-24.953 6.685,-77.02 6.685,-77.02c0,0 0,-52.069 -6.685,-77.024Zm-185.316,125.025l0,-96.002l83.137,48.001l-83.137,48.001Z' />
        </svg>
      );
      break;

    case 'soundCloud':
      icon = (
        <svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
          <g id='Layer_3'>
            <g>
              <g>
                <g>
                  <path
                    className='soundCloud-circle'
                    d='M32,0C14.327,0,0,14.327,0,32c0,17.673,14.327,32,32,32s32-14.327,32-32C64,14.327,49.673,0,32,0z'
                    fill='#f5f5f5'
                  />
                </g>
              </g>
              <g>
                <path
                  d='M49.939,29.645c-0.788,0-1.538,0.158-2.224,0.441c-0.433-5.203-4.785-9.292-10.099-9.292     c-1.639,0-3.174,0.408-4.543,1.1V41.33h16.848c0.006,0,0.012,0.001,0.018,0.001c3.227,0,5.843-2.616,5.843-5.843     C55.782,32.261,53.166,29.645,49.939,29.645z'
                  fill='#000000'
                />
                <g>
                  <defs>
                    <path
                      d='M32.376,22.264c-1.459,0.886-2.68,2.125-3.537,3.605c-1.338-1.096-3.048-1.755-4.913-1.755       c-3.682,0-6.759,2.569-7.552,6.01c-0.71-0.306-1.491-0.478-2.313-0.478c-3.227,0-5.843,2.616-5.843,5.843       c0,3.199,2.571,5.793,5.759,5.839v0.003h0.066c0.006,0,0.012,0.001,0.018,0.001s0.012-0.001,0.018-0.001h18.296V22.264z'
                      id='SVGID_1_'
                    />
                  </defs>
                  <clipPath id='SVGID_2_'>
                    <use overflow='visible' href='#SVGID_1_' />
                  </clipPath>
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='30.739'
                    x2='30.739'
                    y1='20.76'
                    y2='43.878'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='27.624'
                    x2='27.624'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='24.51'
                    x2='24.51'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='21.396'
                    x2='21.396'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='18.281'
                    x2='18.281'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='15.167'
                    x2='15.167'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='12.053'
                    x2='12.053'
                    y1='20.793'
                    y2='43.911'
                  />
                  <line
                    clip-path='url(#SVGID_2_)'
                    fill='none'
                    stroke='#000000'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                    x1='8.939'
                    x2='8.939'
                    y1='20.793'
                    y2='43.911'
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      );
      break;

    default:
      break;
  }

  return (
    <A sizes={sizes} href={url} target='_blank'>
      {icon}
    </A>
  );
};

export default SocialLink;
