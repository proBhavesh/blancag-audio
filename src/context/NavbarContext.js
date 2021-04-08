import React, { useState, useEffect } from 'react';
import { client as sanity } from '../sanityClient';

export const NavBarContext = React.createContext({
  textLogo: null,
  textLogoSizes: {
    desktop: null,
    mobile: null,
  },
  navLinkFontSize: null,
});

const NavbarContextComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [navBarData, setNavBarData] = useState(null);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == 'navbar'][0]{
      'textLogo': textLogo,
      'textLogoSizes': {
        'desktop': textLogo_size_desktop,
        'mobile': textLogo_size_mobile
      },
      'navLinkFontSize': navLink_fontSize_mobile
    }`
      )
      .then((res) => {
        setNavBarData(res);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? null : (
    <NavBarContext.Provider value={navBarData}>
      {children}
    </NavBarContext.Provider>
  );
};

export default NavbarContextComponent;
