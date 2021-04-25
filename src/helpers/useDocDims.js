import { useState, useEffect } from 'react';

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
    window.addEventListener('resize', function () {
      setDocDims();
    });
    window.addEventListener('orientationchange', function () {
      setDocDims();
    });
  }, []);

  return width;
};

export default useDocDims;
