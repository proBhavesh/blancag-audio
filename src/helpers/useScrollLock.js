import { useState, useRef, useCallback } from 'react';
import { isSafari, isMobile } from 'react-device-detect';

const useScrollLock = () => {
  const [top, setTop] = useState(0);
  const prevStyles = useRef(`${window.innerHeight / 100}px`);

  const stopScroll = useCallback(() => {
    prevStyles.current = document.documentElement.style.getPropertyValue(
      '--vh'
    );
    // !isSafari
    //   ? (() => {
    const paddingRight = +getComputedStyle(
      document.querySelector('.content-div')
    )
      .getPropertyValue('padding-right')
      .split('')
      .slice(0, -2)
      .join('');

    setTop(document.querySelector('.content-div').scrollTop);
    document
      .querySelector('.content-div')
      .setAttribute(
        'style',
        `overflow-y:hidden; padding-right: ${
          paddingRight + (!isMobile ? 8 : 4)
        }px`
      );
    document.documentElement.setAttribute(
      'style',
      ` --vh: ${prevStyles.current};`
    );
    //   })()
    // : (() => {
    //     setTop(document.documentElement.scrollTop);
    //     document.documentElement.setAttribute(
    //       'style',
    //       `overflow-y:hidden; --vh: ${prevStyles.current}; padding-right: ${
    //         !isMobile ? 8 : 2
    //       }px`
    //     );
    //   })();
  }, []);

  const resumeScroll = useCallback(
    () =>
      // !isSafari
      document.querySelector('.content-div').setAttribute('style', ''),
    // : document.documentElement.setAttribute(
    //     'style',
    //     `--vh: ${prevStyles.current}`
    //   ),
    []
  );

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top,
  };
};

export default useScrollLock;
