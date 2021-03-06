import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FacebookShareButton,
  TwitterShareButton,
  TumblrShareButton,
  WhatsappShareButton,
} from 'react-share';

import { MusicPageData } from '../../../containers/MusicContainer/index';

import FacebookIcon from '../../../assets/Facebook.svg';
import TwitterIcon from '../../../assets/Twitter.svg';
import TumblrIcon from '../../../assets/Tumblr.svg';
import WhatsappIcon from '../../../assets/Whatsapp.svg';

const IconDiv = styled.div`
  height: ${(props) => Math.round(props.sizes.desktopTitle * 1.5)}px;
  ${(props) =>
    props.arrow &&
    `padding: ${Math.round(props.sizes.desktopTitle * 0.35)}px 0;`}

  display: grid;
  place-items: center;

  @media (max-width: 768px) {
    height: ${(props) => props.sizes.mobileTitle * 1.5}px;
    ${(props) =>
      props.arrow &&
      `
      padding: ${Math.round(props.sizes.mobileTitle * 0.35)}px 0;
      grid-area: arrow;
    `}
  }

  img {
    height: 100%;
  }

  svg {
    fill: ${(props) => props.theme.textWhite};
    height: 100%;
  }
`;

const ShareIconsDiv = styled.div`
  grid-area: share;
  justify-self: flex-end;

  display: flex;
  align-items: center;

  margin-right: 1rem;

  @media (max-width: 768px) {
    margin: 0;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: 'arrow' 'shareIcons';
    gap: 0;
    justify-items: flex-end;
  }
`;

const InnerShareIconsDiv = styled(motion.div)`
  margin-right: 1rem;
  display: flex;

  @media (max-width: 768px) {
    grid-area: shareIcons;
    margin-right: -0.2rem;
  }
`;

const ShareIconDiv = styled(IconDiv)`
  height: ${(props) => Math.round(props.sizes.desktopTitle * 1.5)}px;
  margin-right: 0.25rem;

  img {
    height: 100%;
    width: auto;
  }

  @media (max-width: 768px) {
    height: ${(props) => Math.round(props.sizes.mobileTitle * 1.5)}px;
  }
`;

const LinkIconDiv = styled(ShareIconDiv)`
  width: ${(props) => Math.round(props.sizes.desktopTitle * 1.5)}px;
  background-color: ${(props) => props.theme.textWhite};
  border-radius: 50%;
  padding: ${(props) => Math.round(props.sizes.desktopTitle * 0.35)}px 0;
  margin-right: 0;

  @media (max-width: 768px) {
    width: ${(props) => props.sizes.mobileTitle * 1.5}px;
    padding: ${(props) => props.sizes.mobileTitle * 0.35}px 0;
    margin-right: 0;
  }

  position: relative;

  svg {
    fill: ${(props) => props.theme.bgBlack};
  }
`;

const CopiedMessage = styled.div`
  pointer-events: none;
  cursor: default;
  position: absolute;
  top: calc(100% + 1rem);

  font-size: 0.75rem;
  color: ${(props) => props.theme.bgBlack};
  padding: 0.15em 0.6em;

  background-color: ${(props) => props.theme.textWhite};
  border: 1px solid ${(props) => props.theme.textGrey};
  border-radius: 1em;

  transition: opacity 0.25s linear;
  opacity: ${(props) => (props.showMessage ? 1 : 0)};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;

    background-color: ${(props) => props.theme.textWhite};
    border-top: 1px solid ${(props) => props.theme.textGrey};
    border-left: 1px solid ${(props) => props.theme.textGrey};
    font-size: 0.75rem;

    width: 0.5rem;
    height: 0.5rem;

    transform: translatex(-50%) translateY(-60%) rotate(45deg);
  }
`;

const ShareIcons = ({ index, showIconsItemIndex, setShowIconsItemIndex }) => {
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    sizes: {
      playlist: {
        title: { desktop: desktopTitle, mobile: mobileTitle },
      },
    },
  } = useContext(MusicPageData);

  const url = `${window.location.href}`;

  useEffect(() => {
    let timer;

    copied &&
      (() => {
        timer = setTimeout(() => {
          setCopied(false);
        }, 1500);
      })();

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  useEffect(() => {
    showIconsItemIndex !== index - 1 && setShowShareIcons(false);
  }, [index, showIconsItemIndex]);

  return (
    <ShareIconsDiv>
      <InnerShareIconsDiv
        animate={{ opacity: showShareIcons ? 1 : 0 }}
        style={{
          opacity: 0,
          pointerEvents: showShareIcons ? 'initial' : 'none',
        }}
        transition={{ duration: 0.25 }}
      >
        <FacebookShareButton url={url}>
          <ShareIconDiv
            className='icon-div'
            sizes={{ desktopTitle, mobileTitle }}
          >
            <img src={FacebookIcon} alt='facebook-share' />
          </ShareIconDiv>
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <ShareIconDiv
            className='icon-div'
            sizes={{ desktopTitle, mobileTitle }}
          >
            <img src={TwitterIcon} alt='twitter-share' />
          </ShareIconDiv>
        </TwitterShareButton>
        <TumblrShareButton url={url}>
          <ShareIconDiv
            className='icon-div'
            sizes={{ desktopTitle, mobileTitle }}
          >
            <img src={TumblrIcon} alt='linked-in-share' />
          </ShareIconDiv>
        </TumblrShareButton>
        <WhatsappShareButton url={url}>
          <ShareIconDiv
            className='icon-div'
            sizes={{ desktopTitle, mobileTitle }}
          >
            <img src={WhatsappIcon} alt='whatsapp-share' />
          </ShareIconDiv>
        </WhatsappShareButton>
        <LinkIconDiv
          className='icon-div'
          sizes={{ desktopTitle, mobileTitle }}
          onClick={(e) => {
            e.preventDefault();
            window.navigator.clipboard.writeText(url);
            setCopied(true);
          }}
        >
          <CopiedMessage showMessage={copied}>Copied!</CopiedMessage>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 12.57 12.57'
            transform='rotate(90)'
          >
            <path d='M12.43,9.15,8.89,5.61a.51.51,0,0,0-.71,0l-.93.93-.61-.61L6,5.32,7,4.39a.5.5,0,0,0,0-.71L3.43.15A.49.49,0,0,0,3.07,0a.47.47,0,0,0-.35.15L.15,2.72A.47.47,0,0,0,0,3.07a.51.51,0,0,0,.15.36L3.68,7A.51.51,0,0,0,4,7.11.5.5,0,0,0,4.39,7L5.32,6l.61.61.61.61-.93.93a.51.51,0,0,0,0,.71l3.54,3.53a.48.48,0,0,0,.7,0l2.58-2.57a.51.51,0,0,0,0-.7ZM4,5.9,1.21,3.07,3.07,1.21,5.9,4l-.58.58-.93-.94-.71.71.93.93ZM9.5,11.37,6.67,8.54,7.25,8l.93.93.71-.71L8,7.25l.58-.58L11.37,9.5Z' />
          </svg>
        </LinkIconDiv>
      </InnerShareIconsDiv>
      <IconDiv
        className='icon-div'
        arrow
        onClick={(e) => {
          e.preventDefault();
          setShowIconsItemIndex(index - 1);
          setShowShareIcons((prev) => !prev);
        }}
        sizes={{ desktopTitle, mobileTitle }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28.01'>
          <path d='M28,10a1,1,0,0,1-.33.74l-10,9a1,1,0,0,1-1.08.17A1,1,0,0,1,16,19V15.19A18.61,18.61,0,0,0,2.19,27.34a1,1,0,0,1-.94.67H1.16a1,1,0,0,1-.9-.83A19.22,19.22,0,0,1,0,24.06,19,19,0,0,1,16,5.31V1A1,1,0,0,1,17.67.26l10,9A1,1,0,0,1,28,10Z' />
        </svg>
      </IconDiv>
    </ShareIconsDiv>
  );
};

export default ShareIcons;
