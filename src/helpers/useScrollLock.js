import { useRef, useCallback } from 'react';
import { isMobile } from 'react-device-detect';

const useScrollLock = () => {
  const top = useRef(0);
  const prevStyles = useRef(`${window.innerHeight / 100}px`);

  const stopScroll = useCallback(() => {
    prevStyles.current = `${window.innerHeight / 100}px`;
    document.documentElement.style.setProperty(
      '--vh',
      `${prevStyles.current};`
    );

    top.current = document.documentElement.scrollTop;

    const paddingRight =
      document.querySelector('.content-div') &&
      +getComputedStyle(document.querySelector('.content-div'))
        .getPropertyValue('padding-right')
        .split('')
        .slice(0, -2)
        .join('');

    document
      .querySelector('.content-div')
      .setAttribute(
        'style',
        `position:fixed; overflow-y:hidden; padding-right: ${
          isMobile ? paddingRight : paddingRight + 8
        }px; top: -${top.current}px`
      );
  }, []);

  const resumeScroll = useCallback(() => {
    document.querySelector('.content-div').setAttribute('style', '');
    document.documentElement.scrollTo(0, top.current);
  }, []);

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top.current,
  };
};

export default useScrollLock;
