import { useRef, useCallback } from 'react';

const useScrollLock = () => {
  const top = useRef(0);

  const stopScroll = useCallback(() => {
    top.current = window.scrollY;
    document.body.setAttribute(
      'style',
      `
      position: fixed;
      top: -${top.current}px;
      left: 0;
      right: 0;
    `
    );
  }, []);

  const resumeScroll = useCallback(() => {
    document.body.setAttribute('style', '');
    window.scrollTo({
      top: top.current,
      behavior: 'smooth',
    });
  }, []);

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
  };
};

export default useScrollLock;
