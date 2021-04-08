import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Nav/NavBar';

import { client as sanity } from '../../sanityClient';

const DemosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [navBarData, setNavBarData] = useState({
    textLogo: null,
    textLogoSizes: {
      desktop: null,
      mobile: null,
    },
    navLinkFontSize: null,
  });

  useEffect(() => {
    Promise.all([
      sanity.fetch(`*[_type == 'navbar'][0]{
      'textLogo': textLogo,
      'textLogoSizes': {
        'desktop': textLogo_size_desktop,
        'mobile': textLogo_size_mobile
      },
      'navLinkFontSize': navLink_fontSize_mobile
    }`),
    ]).then((res) => {
      setNavBarData(res[0]);
      setIsLoading(false);
    });
  }, []);

  return <>{!isLoading && <Navbar data={navBarData} />}</>;
};

export default DemosPage;
