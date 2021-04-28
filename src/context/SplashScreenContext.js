import React, { useState, useEffect } from 'react';
import { client as sanity } from '../sanityClient';

export const SplashScreenContext = React.createContext({
  desktop: null,
  mobile: null,
});

const SplashScreenContextComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == 'splashScreenSizes'][0]{
      'desktop': splashScreen_size_desktop,
      'mobile': splashScreen_size_mobile
    }`
      )
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? null : (
    <SplashScreenContext.Provider value={data}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export default SplashScreenContextComponent;
