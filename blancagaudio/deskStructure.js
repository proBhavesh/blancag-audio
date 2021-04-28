import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFont,
  faVideo,
  faImage,
  faTools,
  faShareAlt,
  faComments,
  faAlignJustify,
  faTextWidth,
  faEllipsisH,
  faAtom,
  faFilm,
  faMusic,
  faCompactDisc,
} from '@fortawesome/free-solid-svg-icons';
import { faVimeo } from '@fortawesome/free-brands-svg-icons';
import Avatar from '../src/assets/Avatar.png';

const HomeIcon = () => <FontAwesomeIcon icon={faHome} />;
const ContentIcon = () => <FontAwesomeIcon icon={faAlignJustify} />;
const SizesIcon = () => <FontAwesomeIcon icon={faTextWidth} />;
const TextIcon = () => <FontAwesomeIcon icon={faFont} />;
const VideoIcon = () => <FontAwesomeIcon icon={faVideo} />;
const ImageIcon = () => <FontAwesomeIcon icon={faImage} />;
const SkillsIcon = () => <FontAwesomeIcon icon={faTools} />;

const CommonIcon = () => <FontAwesomeIcon icon={faComments} />;
const NavBarIcon = () => <FontAwesomeIcon icon={faEllipsisH} />;
const FxIcon = () => <FontAwesomeIcon icon={faAtom} />;
const SocialIcon = () => <FontAwesomeIcon icon={faShareAlt} />;
const UFOIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 89.03 72.3'>
    <path d='M89,52.35c0-4.22-11.37-14.16-21.56-16.6l-.46-.1c-1.08-7-6-20.71-21.63-21.2V5.09a2.62,2.62,0,1,0-1.73,0v9.36C28,14.94,23.1,28.67,22,35.67a4,4,0,0,0-.46.08C9.85,38.15,0,47.77,0,52.35c0,4.87,8.7,9.13,21.7,11.47l1.81,2.23c3.07,3.8,11.32,6.25,21,6.25s17.93-2.45,21-6.25l1.81-2.23C80.33,61.49,89,57.22,89,52.35ZM44.52,1.73a.89.89,0,1,1-.9.89A.89.89,0,0,1,44.52,1.73ZM28,26.4C31.59,20.18,37.16,17,44.52,17s12.92,3.16,16.55,9.38a27.69,27.69,0,0,1,3.6,12c0,1.46-6,5.14-20.15,5.14S24.36,39.9,24.36,38.44A27.75,27.75,0,0,1,28,26.4ZM44.52,69.71c-9,0-16.52-2.22-19-5.28l2.18.29h0L30,65h0c1.52.16,3.07.29,4.65.4h0l2.32.14h.16c.75,0,1.49.07,2.25.09h.21l2.29.06h.17l2.47,0,2.46,0h.18l2.28-.06h.21c.76,0,1.51-.06,2.25-.09h.17l2.31-.14h0c1.58-.11,3.13-.24,4.65-.4h0l2.23-.25h0l2.17-.29C61,67.49,53.47,69.71,44.52,69.71ZM75.13,58.9c-8.14,2.44-19,3.79-30.61,3.79S22,61.34,13.9,58.9C5.29,56.32,3,53.48,3,52.35c0-.75,1.33-3.49,5.3-6.8a33.28,33.28,0,0,1,12-6.39c.8,2.49,3.54,4.46,8.19,5.86a58.45,58.45,0,0,0,16,2,58.43,58.43,0,0,0,16-2c4.6-1.39,7.33-3.32,8.16-5.78a38.3,38.3,0,0,1,11.17,6.25c4.34,3.43,6,6.14,6.14,6.89C86,53.53,83.67,56.34,75.13,58.9Z' />
    <path d='M44.52,50.84a2.62,2.62,0,1,0,2.61,2.62A2.62,2.62,0,0,0,44.52,50.84Zm0,3.51a.89.89,0,1,1,.89-.89A.89.89,0,0,1,44.52,54.35Z' />
    <path d='M70.37,46.53A2.62,2.62,0,1,0,73,49.15,2.62,2.62,0,0,0,70.37,46.53Zm0,3.52a.9.9,0,1,1,0-1.79.9.9,0,0,1,0,1.79Z' />
    <path d='M17.8,46.53a2.62,2.62,0,1,0,2.62,2.62A2.62,2.62,0,0,0,17.8,46.53Zm0,3.52a.9.9,0,1,1,.9-.9A.9.9,0,0,1,17.8,50.05Z' />
    <path d='M27.71,38.62a.86.86,0,0,0,.87-.86,17.93,17.93,0,0,1,5.61-13.52c3.38-3,8-4.27,13.31-3.65a.86.86,0,1,0,.2-1.71C41.87,18.2,36.8,19.6,33,23a19.69,19.69,0,0,0-6.19,14.81A.86.86,0,0,0,27.71,38.62Z' />
  </svg>
);
const AvatarIcon = () => (
  <div>
    <img src={Avatar} alt='avatar' style={{ width: '100%', height: '100%' }} />
  </div>
);

const DemosIcon = () => <FontAwesomeIcon icon={faFilm} />;
const VimeoIcon = () => <FontAwesomeIcon icon={faVimeo} />;

const MusicIcon = () => <FontAwesomeIcon icon={faMusic} />;
const MusicFileIcon = () => <FontAwesomeIcon icon={faCompactDisc} />;

const exportFunc = () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.listItem()
                .title('Content')
                .icon(ContentIcon)
                .child(
                  S.list()
                    .title('Home Page Content')
                    .items([
                      S.listItem()
                        .title('Text Content')
                        .icon(TextIcon)
                        .child(
                          S.document()
                            .title('All the textual content on the homepage')
                            .schemaType('homePageText')
                            .documentId('homePageText')
                        ),
                      S.listItem()
                        .title('Video')
                        .icon(VideoIcon)
                        .child(
                          S.document()
                            .title('Video')
                            .schemaType('homePageVid')
                            .documentId('homePageVid')
                        ),
                      S.listItem()
                        .title('Pics')
                        .icon(ImageIcon)
                        .child(
                          S.document()
                            .title('Pics for Home Page')
                            .schemaType('homePagePics')
                            .documentId('homePagePics')
                        ),
                      S.listItem()
                        .title('Skills Section')
                        .id('skillsSection')
                        .icon(SkillsIcon)
                        .child(
                          S.documentList()
                            .title('Skills Section Content')
                            .filter("_type == 'skillsSection'")
                        ),
                    ])
                ),
              S.listItem()
                .title('Sizes')
                .icon(SizesIcon)
                .child(
                  S.document()
                    .title('Home Page Sizes')
                    .schemaType('homePageSizes')
                    .documentId('homePageSizes')
                ),
            ])
        ),
      S.listItem()
        .title('Demos Page')
        .icon(DemosIcon)
        .child(
          S.list()
            .title('Demos Page')
            .items([
              S.listItem()
                .title('Demos Page Video Links')
                .icon(VimeoIcon)
                .child(
                  S.document()
                    .title('All the links to videos on demos page')
                    .schemaType('demosPageVidLinks')
                    .documentId('demosPageVidLinks')
                ),
              S.listItem()
                .title('Sizes')
                .icon(SizesIcon)
                .child(
                  S.document()
                    .title('Demos Page Sizes')
                    .schemaType('demosPageSizes')
                    .documentId('demosPageSizes')
                ),
            ])
        ),
      S.listItem()
        .title('Music Page')
        .icon(MusicIcon)
        .child(
          S.list()
            .title('Music Page')
            .items([
              S.listItem()
                .title('Music Page Files')
                .icon(MusicFileIcon)
                .child(
                  S.document()
                    .title('Music Files for Music Page')
                    .schemaType('musicFiles')
                    .documentId('musicFiles')
                ),
              S.listItem()
                .title('Music Page Sizes')
                .icon(SizesIcon)
                .child(
                  S.document()
                    .title('Music Page Sizes')
                    .documentId('musicPageSizes')
                    .schemaType('musicPageSizes')
                ),
            ])
        ),
      S.listItem()
        .title('Common Stuff (across pages)')
        .icon(CommonIcon)
        .child(
          S.list()
            .title('Common Stuff')
            .items([
              S.listItem()
                .title('Nav Bar')
                .icon(NavBarIcon)
                .child(
                  S.document()
                    .title('NavBar')
                    .schemaType('navbar')
                    .documentId('navbar')
                ),
              S.listItem()
                .title('Fx Related')
                .icon(FxIcon)
                .child(
                  S.document()
                    .title('Fx Related')
                    .schemaType('fx')
                    .documentId('fx')
                ),
              S.listItem()
                .title('Footer')
                .icon(SocialIcon)
                .child(
                  S.document()
                    .title('Footer')
                    .schemaType('footer')
                    .documentId('footer')
                ),
              S.listItem()
                .title('Loading Indicator')
                .icon(UFOIcon)
                .child(
                  S.document()
                    .title('Loading Indicator Sizes')
                    .schemaType('loadingSizes')
                    .documentId('loadingSizes')
                ),
              S.listItem()
                .title('Splash Screen')
                .icon(AvatarIcon)
                .child(
                  S.document()
                    .title('Splash Screen Sizes')
                    .schemaType('splashScreenSizes')
                    .documentId('splashScreenSizes')
                ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'navbar',
            'fx',
            'footer',
            'loadingSizes',
            'splashScreenSizes',

            'homePageText',
            'homePageSizes',
            'homePageVid',
            'homePagePics',
            'skillsSection',

            'demosPageVidLinks',
            'demosPageSizes',

            'musicFile',
            'musicFiles',
            'musicPageSizes',
          ].includes(listItem.getId())
      ),
    ]);

export default exportFunc;
