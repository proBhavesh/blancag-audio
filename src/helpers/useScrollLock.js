import { useState, useRef, useCallback } from 'react';
import { isSafari, isMobile } from 'react-device-detect';

const useScrollLock = () => {
  const [top, setTop] = useState(0);
  const prevStyles = useRef(`${window.innerHeight / 100}px`);

  const stopScroll = useCallback(() => {
    prevStyles.current = document.documentElement.style.getPropertyValue(
      '--vh'
    );
    document.documentElement.style.setProperty(
      '--vh',
      `${prevStyles.current};`
    );

    setTop(document.documentElement.scrollTop);

    const paddingRight = +getComputedStyle(
      document.querySelector('.content-div')
    )
      .getPropertyValue('padding-right')
      .split('')
      .slice(0, -2)
      .join('');

    isMobile
      ? document.documentElement.setAttribute('style', 'overflow-y:hidden')
      : (() => {
          document
            .querySelector('.content-div')
            .setAttribute(
              'style',
              `position:fixed; overflow-y:hidden; padding-right: ${
                !isMobile ? paddingRight + 8 : paddingRight + 4
              }px;`
            );
        })();
  }, []);

  const resumeScroll = useCallback(() => {
    isMobile
      ? document.documentElement.setAttribute('style', '')
      : document.querySelector('.content-div').setAttribute('style', '');
  }, []);

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top,
  };
};

export default useScrollLock;
