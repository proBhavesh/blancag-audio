import { useRef, useCallback, useEffect } from 'react';
import { isIOS } from 'react-device-detect';

const useScrollLock = () => {
  const top = useRef(0);

  const getTop = useCallback((e) => {
    top.current = e.target.scrollTop;
  }, []);

  useEffect(() => {
    !isIOS
      ? document
          .querySelector('.content-div')
          .addEventListener('scroll', getTop)
      : document.documentElement.addEventListener('scroll', getTop);
  }, [getTop]);

  const stopScroll = useCallback(
    () =>
      !isIOS
        ? document
            .querySelector('.content-div')
            .setAttribute('style', 'overflow-y:hidden')
        : document.documentElement.setAttribute('style', 'overflow-y:hidden'),
    []
  );

  const resumeScroll = useCallback(
    () =>
      !isIOS
        ? document.querySelector('.content-div').setAttribute('style', '')
        : document.documentElement.setAttribute('style', ''),
    []
  );

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top.current,
  };
};

export default useScrollLock;
