import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

const useDocDims = () => {
  const [width, setWidth] = useState(null);

  function setDocDims() {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight / 100}px`
    );
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setDocDims();
    isMobile && window.addEventListener('scroll', setDocDims);
    window.addEventListener('resize', setDocDims);
    window.addEventListener('orientationchange', setDocDims);
  }, []);

  return width;
};

export default useDocDims;
