import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Nav/NavBar';

import { client as sanity } from '../../sanityClient';

import Hero from '../../components/HomePageComponents/Hero/Hero';

export const HomePageData = React.createContext({
  hero: {
    video: null,
    headLine: null,
    headLineFontSizes: {
      desktop: null,
      mobile: null,
    },
  },
});

const HomePage = ({ location }) => {
  // const redirected = location.redirected;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      // -- HERO
      sanity.fetch(`*[_type == 'homePageVid'][0].video.asset->.url`),
      sanity.fetch(`*[_type == 'homePageText'][0].headLine`),
      sanity.fetch(`*[_type == 'homePageSizes'][0]{
        'desktop':headLine_fontSize_desktop,
        'mobile': headLine_fontSize_mobile
      }`),
    ]).then((res) => {
      setData({
        hero: {
          video: res[0],
          headLine: res[1],
          headLineFontSizes: res[2],
        },
      });
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <HomePageData.Provider value={data}>
            <Hero />
          </HomePageData.Provider>
        </>
      )}
    </>
  );
};

export default HomePage;
