import React, { useState, useEffect } from 'react';
import { client as sanity } from '../sanityClient';

export const FooterContext = React.createContext({
  links: {
    linked: null,
    vimeo: null,
    youtube: null,
    soundCloud: null,
  },
  sizes: {
    gap: null,
    circleSizes: {
      desktop: null,
      mobile: null,
    },
  },
});

const FooterContextComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == 'footer'][0]{
      'links': {
        'linkedIn': linkedIn,
        'vimeo': vimeo,
        'youtube': youtube,
        'soundCloud': soundCloud,
      },
      'sizes': {
        'gap': socialIcons_gap,
        'circleSizes': {
          'desktop': socialIcons_size_desktop,
          'mobile': socialIcons_size_mobile
        }
      },
    }`
      )
      .then((res) => {
        setFooterData(res);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? null : (
    <FooterContext.Provider value={footerData}>
      {children}
    </FooterContext.Provider>
  );
};

export default FooterContextComponent;
