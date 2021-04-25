import { useState, useRef, useCallback } from 'react';
import { isIOS } from 'react-device-detect';

const useScrollLock = () => {
  const [top, setTop] = useState(0);
  const prevStyles = useRef(`${window.innerHeight / 100}px`);

  const stopScroll = useCallback(() => {
    !isIOS
      ? (() => {
          setTop(document.querySelector('.content-div').scrollTop);
          document
            .querySelector('.content-div')
            .setAttribute('style', 'overflow-y:hidden');
        })()
      : (() => {
          prevStyles.current = document.documentElement.style.getPropertyValue(
            '--vh'
          );
          setTop(document.documentElement.scrollTop);
          document.documentElement.setAttribute(
            'style',
            `overflow-y:hidden; --vh: ${prevStyles.current}`
          );
        })();
  }, []);

  const resumeScroll = useCallback(
    () =>
      !isIOS
        ? document.querySelector('.content-div').setAttribute('style', '')
        : document.documentElement.setAttribute(
            'style',
            `--vh: ${prevStyles.current}`
          ),
    []
  );

  return {
    stopScroll: stopScroll,
    resumeScroll: resumeScroll,
    top: top,
  };
};

export default useScrollLock;
