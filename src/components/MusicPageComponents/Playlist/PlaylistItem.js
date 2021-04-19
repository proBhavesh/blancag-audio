import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';

import { secondsToMinute } from '../../../helpers/SecondsToMinutes';

const ListItem = styled.li`
  width: 100%;

  padding: 0.5rem;
  padding-right: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    padding-right: 1.5rem;
  }

  border-bottom: 1px solid #a6a6a680;

  &:last-of-type {
    border-bottom: none;
  }

  h4 {
    font-weight: normal;
  }

  transition: background-color 0.25s linear;

  &:not(.active):hover {
    cursor: pointer;
    background-color: #a6a6a640;
  }

  &.active {
    background-color: #bada55bf;
    color: #000;

    svg {
      fill: #000;
    }
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;

  width: 100%;

  display: grid;
  grid-template-columns: 6rem minmax(max-content, 50%) auto min-content;
  grid-template-areas: 'number title share duration';
  align-items: center;
  justify-items: start;
  column-gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: minmax(max-content, 50%) auto;
    grid-template-areas: 'title share' 'duration share';
    row-gap: 0.5rem;
  }

  p {
    grid-area: number;

    &:last-of-type {
      grid-area: duration;
      @media (max-width: 768px) {
        justify-self: flex-start;
        font-size: 0.85rem;
      }
    }
  }

  h4 {
    grid-area: title;
  }
`;

const IconDiv = styled.div`
  height: 1.5rem;
  ${(props) => props.arrow && `padding: 0.35rem 0;`}

  display: grid;
  place-items: center;

  @media (max-width: 768px) {
    ${(props) =>
      props.arrow &&
      `
      grid-area: arrow;
      justify-self: flex-end;
    `}
  }

  svg {
    fill: #fff;
    height: 100%;
  }
`;

const ShareIconsDiv = styled.div`
  grid-area: share;
  justify-self: flex-end;

  display: flex;
  align-items: center;
  gap: 1rem;

  margin-right: 1rem;

  @media (max-width: 768px) {
    margin: 0;
    display: grid;
    grid-template-rows: reepeat(2, 1fr);
    grid-template-areas: 'arrow' 'shareIcons';
    gap: 0;
  }
`;

const InnerShareIconsDiv = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-area: shareIcons;
  }
`;

const ShareIconDiv = styled(IconDiv)`
  height: 1.5rem;

  ${(props) =>
    props.link &&
    `
    width: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 50%;
    padding: 0.35rem 0;
    transform: rotate(90deg);

    svg {
      fill: #000;
    }
  `}
`;

const PlaylistItem = ({ file, index, active, setCopied }) => {
  const [duration, setDuration] = useState(0);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const url = window.location.href;

  return (
    <>
      <audio
        src={file.file}
        preload='metadata'
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      ></audio>
      <ListItem className={active ? 'active' : ''}>
        <LinkStyled
          to={{
            pathname: `/music/${index - 1}`,
            state: { redirect: true },
          }}
        >
          {window.innerWidth > 768 && <p>{index}</p>}
          <h4>{file.title}</h4>
          <ShareIconsDiv>
            <motion.div
              animate={{ opacity: showShareIcons ? 1 : 0 }}
              style={{
                opacity: 0,
                pointerEvents: showShareIcons ? 'initial' : 'none',
              }}
            >
              <InnerShareIconsDiv>
                <FacebookShareButton
                  url={url}
                  onShareWindowClose={() => setShowShareIcons(false)}
                >
                  <ShareIconDiv>
                    <svg
                      viewBox='0 0 512 512'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g>
                        <circle cx='256' cy='256' fill='#3B5998' r='256' />
                        <path
                          d='M301.6,151.2c15.6,0,36.3,0,36.3,0V97c0,0-21.8,0-51.4,0c-29.6,0-68.1,19-68.1,74.2c0,10.3,0,25.4,0,43   h-49.1v56.1h49.1c0,69.9,0,146,0,146h21.8h17.3H277c0,0,0-78.8,0-146h48.8l8.1-56.1H277c0-18.4,0-31.8,0-35.7   C277,160.1,286,151.2,301.6,151.2z'
                          fill='#FFFFFF'
                        />
                      </g>
                    </svg>
                  </ShareIconDiv>
                </FacebookShareButton>
                <TwitterShareButton
                  url={url}
                  onShareWindowClose={() => setShowShareIcons(false)}
                >
                  <ShareIconDiv>
                    <svg
                      viewBox='0 0 512 512'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g>
                        <path
                          d='M512,256c0,141.4-114.6,256-256,256C114.6,512,0,397.4,0,256C0,114.6,114.6,0,256,0   C397.4,0,512,114.6,512,256z'
                          fill='#1DA1F2'
                        />
                        <path
                          d='M358.5,202.9c3.3,73.9-51.8,156.2-149.3,156.2c-29.7,0-57.3-8.7-80.5-23.6   c27.9,3.3,55.7-4.4,77.8-21.7c-23-0.4-42.4-15.6-49.1-36.5c8.2,1.6,16.3,1.1,23.7-0.9c-25.3-5.1-42.7-27.8-42.1-52.2   c7.1,3.9,15.2,6.3,23.8,6.6c-23.4-15.6-30-46.5-16.3-70.1c25.9,31.8,64.6,52.7,108.3,54.9c-7.6-32.9,17.3-64.5,51.2-64.5   c15.1,0,28.7,6.4,38.3,16.6c12-2.4,23.2-6.7,33.4-12.7c-3.9,12.3-12.3,22.6-23.1,29.1c10.6-1.3,20.7-4.1,30.2-8.3   C377.6,186.3,368.7,195.5,358.5,202.9z'
                          fill='#FFFFFF'
                        />
                      </g>
                    </svg>
                  </ShareIconDiv>
                </TwitterShareButton>
                <LinkedinShareButton
                  url={url}
                  onShareWindowClose={() => setShowShareIcons(false)}
                >
                  <ShareIconDiv>
                    <svg
                      viewBox='0 0 512 512'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g>
                        <circle cx='256' cy='256' fill='#0077B5' r='256' />
                        <path
                          d='M186.8,371.7h-51.9V204.1h51.9V371.7z M160.6,182.2   c-16.9,0-30.7-13.8-30.7-30.9c0-17.1,13.7-30.9,30.7-30.9c16.9,0,30.7,13.8,30.7,30.9C191.3,168.3,177.5,182.2,160.6,182.2z    M381.2,371.7h-51.6c0,0,0-63.8,0-88c0-24.1-9.2-37.6-28.2-37.6c-20.8,0-31.6,14-31.6,37.6c0,25.8,0,88,0,88h-49.8V204.1h49.8v22.6   c0,0,15-27.7,50.5-27.7c35.5,0,61,21.7,61,66.6C381.2,310.5,381.2,371.7,381.2,371.7z'
                          fill='#FFFFFF'
                        />
                      </g>
                    </svg>
                  </ShareIconDiv>
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={url}
                  onShareWindowClose={() => setShowShareIcons(false)}
                >
                  <ShareIconDiv>
                    <svg
                      viewBox='2619 506 120 120'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <defs>
                        <style>
                          .cls-1 {'{'}
                          fill: #27d045;
                          {'}'}
                          .cls-2, .cls-5 {'{'}
                          fill: none;
                          {'}'}
                          .cls-2 {'{'}
                          stroke: #fff; stroke-width: 5px;
                          {'}'}
                          .cls-3 {'{'}
                          fill: #fff;
                          {'}'}
                          .cls-4 {'{'}
                          stroke: none;
                          {'}'}
                        </style>
                      </defs>
                      <g
                        data-name='Group 36'
                        id='Group_36'
                        transform='translate(2300 73)'
                      >
                        <circle
                          className='cls-1'
                          cx='60'
                          cy='60'
                          data-name='Ellipse 18'
                          id='Ellipse_18'
                          r='60'
                          transform='translate(319 433)'
                        />
                        <g
                          data-name='Group 35'
                          id='Group_35'
                          transform='translate(254 386)'
                        >
                          <g data-name='Group 34' id='Group_34'>
                            <g
                              className='cls-2'
                              data-name='Ellipse 19'
                              id='Ellipse_19'
                              transform='translate(94 75)'
                            >
                              <circle
                                className='cls-4'
                                cx='31.5'
                                cy='31.5'
                                r='31.5'
                              />
                              <circle
                                className='cls-5'
                                cx='31.5'
                                cy='31.5'
                                r='29'
                              />
                            </g>
                            <path
                              className='cls-3'
                              d='M1424,191l-4.6,16.3,16.9-4.7.9-5.2-11,3.5,2.9-10.5Z'
                              data-name='Path 126'
                              id='Path_126'
                              transform='translate(-1325 -68)'
                            />
                            <path
                              className='cls-1'
                              d='M1266,90c0-.1,3.5-11.7,3.5-11.7l8.4,7.9Z'
                              data-name='Path 127'
                              id='Path_127'
                              transform='translate(-1165 43)'
                            />
                          </g>
                          <path
                            className='cls-3'
                            d='M1439.3,160.6a9.4,9.4,0,0,0-3.9,6.1c-.5,3.9,1.9,7.9,1.9,7.9a50.876,50.876,0,0,0,8.6,9.8,30.181,30.181,0,0,0,9.6,5.1,11.378,11.378,0,0,0,6.4.6,9.167,9.167,0,0,0,4.8-3.2,9.851,9.851,0,0,0,.6-2.2,5.868,5.868,0,0,0,0-2c-.1-.7-7.3-4-8-3.8s-1.3,1.5-2.1,2.6-1.1,1.6-1.9,1.6-4.3-1.4-7.6-4.4a15.875,15.875,0,0,1-4.3-6s.6-.7,1.4-1.8a5.664,5.664,0,0,0,1.3-2.4c0-.5-2.8-7.6-3.5-7.9A11.852,11.852,0,0,0,1439.3,160.6Z'
                            data-name='Path 128'
                            id='Path_128'
                            transform='translate(-1326.332 -68.467)'
                          />
                        </g>
                      </g>
                    </svg>
                  </ShareIconDiv>
                </WhatsappShareButton>
                <ShareIconDiv
                  link
                  onClick={() =>
                    navigator.clipboard
                      .writeText(url)
                      .then((_) => setCopied(true))
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 12.57 12.57'
                  >
                    <path d='M12.43,9.15,8.89,5.61a.51.51,0,0,0-.71,0l-.93.93-.61-.61L6,5.32,7,4.39a.5.5,0,0,0,0-.71L3.43.15A.49.49,0,0,0,3.07,0a.47.47,0,0,0-.35.15L.15,2.72A.47.47,0,0,0,0,3.07a.51.51,0,0,0,.15.36L3.68,7A.51.51,0,0,0,4,7.11.5.5,0,0,0,4.39,7L5.32,6l.61.61.61.61-.93.93a.51.51,0,0,0,0,.71l3.54,3.53a.48.48,0,0,0,.7,0l2.58-2.57a.51.51,0,0,0,0-.7ZM4,5.9,1.21,3.07,3.07,1.21,5.9,4l-.58.58-.93-.94-.71.71.93.93ZM9.5,11.37,6.67,8.54,7.25,8l.93.93.71-.71L8,7.25l.58-.58L11.37,9.5Z' />
                  </svg>
                </ShareIconDiv>
              </InnerShareIconsDiv>
            </motion.div>
            <IconDiv
              arrow
              onClick={(e) => {
                e.preventDefault();
                setShowShareIcons((prev) => !prev);
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28.01'>
                <path d='M28,10a1,1,0,0,1-.33.74l-10,9a1,1,0,0,1-1.08.17A1,1,0,0,1,16,19V15.19A18.61,18.61,0,0,0,2.19,27.34a1,1,0,0,1-.94.67H1.16a1,1,0,0,1-.9-.83A19.22,19.22,0,0,1,0,24.06,19,19,0,0,1,16,5.31V1A1,1,0,0,1,17.67.26l10,9A1,1,0,0,1,28,10Z' />
              </svg>
            </IconDiv>
          </ShareIconsDiv>
          <p>{secondsToMinute(Math.round(duration))}</p>
        </LinkStyled>
      </ListItem>
    </>
  );
};

export default PlaylistItem;
