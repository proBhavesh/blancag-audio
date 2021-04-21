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
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'navbar',
            'fx',
            'footer',

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
