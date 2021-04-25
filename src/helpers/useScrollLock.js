import { useRef, useCallback, useEffect } from 'react';
import { isIOS } from 'react-device-detect';

const useScrollLock = () => {
  const top = useRef(0);
  const prevStyles = useRef(`${window.innerHeight / 100}px`);

  const getTop = useCallback(function (e) {
    top.current = this.scrollTop;
  }, []);

  useEffect(() => {
    !isIOS
      ? document
          .querySelector('.content-div')
          .addEventListener('scroll', getTop)
      : document.documentElement.addEventListener('touchmove', getTop);
  }, [getTop]);

  const stopScroll = useCallback(
    () =>
      !isIOS
        ? document
            .querySelector('.content-div')
            .setAttribute('style', 'overflow-y:hidden')
        : (() => {
            prevStyles.current = document.documentElement.style.getPropertyValue(
              '--vh'
            );
            document.documentElement.setAttribute(
              'style',
              `overflow-y:hidden; --vh: ${prevStyles.current}`
            );
          })(),
    []
  );

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
    top: top.current,
  };
};

export default useScrollLock;
