import { useRef, useCallback, useEffect } from 'react';

const useScrollLock = () => {
  const top = useRef(0);

  const getTop = useCallback((e) => {
    top.current = e.target.scrollTop;
  }, []);

  useEffect(() => {
    document.querySelector('.content-div').addEventListener('scroll', getTop);
  }, [getTop]);

  const stopScroll = useCallback(
    () =>
      document
        .querySelector('.content-div')
        .setAttribute('style', 'overflow-y:hidden'),
    []
  );

  const resumeScroll = useCallback(
    () => document.querySelector('.content-div').setAttribute('style', ''),
    []
  );

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top.current,
  };
};

export default useScrollLock;
