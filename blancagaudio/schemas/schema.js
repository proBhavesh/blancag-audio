// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import richText from './richText';
import highLightBlock from './highLightBlock';

import navbar from './common/navbar';
import fx from './common/fx';
import footer from './common/footer';

import homePageText from './homePage/homePageText';
import homePageVid from './homePage/homePageVid';
import homePagePics from './homePage/homePagePics';
import homePageSizes from './homePage/homePageSizes';
import skillsSection from './homePage/skillsSection';

import demosPageVidLinks from './demosPage/demosPageVidLinks';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    richText,
    highLightBlock,

    navbar,
    fx,
    footer,

    homePageText,
    homePageVid,
    homePagePics,
    homePageSizes,
    skillsSection,

    demosPageVidLinks,
  ]),
});
