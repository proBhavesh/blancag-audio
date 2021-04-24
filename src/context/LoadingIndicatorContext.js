import React, { useState, useEffect } from 'react';
import { client as sanity } from '../sanityClient';

export const LoadingIndicatorContext = React.createContext({
  desktop: null,
  mobile: null,
});

const LoadingIndicatorContextComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingIndicatorSizes, setLoadingIndicatorSizes] = useState(null);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == 'loadingSizes'][0]{
      'desktop': loadingIndicator_size_desktop,
      'mobile': loadingIndicator_size_mobile
    }`
      )
      .then((res) => {
        setLoadingIndicatorSizes(res);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? null : (
    <LoadingIndicatorContext.Provider value={loadingIndicatorSizes}>
      {children}
    </LoadingIndicatorContext.Provider>
  );
};

export default LoadingIndicatorContextComponent;
