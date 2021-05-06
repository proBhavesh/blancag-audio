import { useCallback, useEffect, useRef } from 'react';
import { isIOS } from 'react-device-detect';

import { interactiveElements } from '../components/FxRelated/FXes/InteractiveElementsList';

import useDocDims from '../helpers/useDocDims';

import * as FXes from '../FxConstants';

const useFxPlayer = (ref, type) => {
  const clickCount = useRef(0);
  const width = useDocDims();

  const fxPlayer = useCallback(
    (e) => {
      let ret = false;

      interactiveElements.forEach((element) => {
        if ([...document.querySelectorAll(element)].includes(e.target)) {
          // console.log(e.target);
          ret = true;
        }
      });

      if (ret || !ref.current) {
        return;
      }

      if (type === FXes.EXPLOSION) {
        ref.current.style.setProperty('--angle', Math.random() * 90);

        const maxSize = (50 / 3) * 2;
        const minSize = 50 / 3;
        for (let i = 0; i < 4; i++) {
          ref.current.style.setProperty(
            `--size${i + 1}`,
            `${Math.random() * (maxSize - minSize) + minSize}px`
          );
        }
      } else if (type === FXes.GLITTER) {
        const hue = Math.random() * 360;
        const luminance = Math.random() * (100 - 50) + 50;
        for (let i = 0; i < 20; i++) {
          ref.current.style.setProperty(
            `--randomx${i + 1}`,
            `${Math.floor(Math.random() * 2001) - 1000}%`
          );
          ref.current.style.setProperty(
            `--randomy${i + 1}`,
            `${Math.floor(Math.random() * 2001) - 1000}%`
          );
        }
        ref.current.style.setProperty('--hue', hue);
        ref.current.style.setProperty('--luminance', `${luminance}%`);
      } else if (type === FXes.LASER) {
        const hue = Math.random() * 360;
        ref.current.style.setProperty('--hue', hue);
        ref.current.style.setProperty(
          '--color',
          `hsl(${hue}, ${Math.random() * 100}%, ${
            Math.random() * (100 - 50) + 50
          }%)`
        );
        ref.current.style.setProperty(
          '--angle',
          (Math.random() * (9 - 5) + 5) * 10
        );
      } else if (type === FXes.SPELL) {
        const svg = ref.current.children[1];
        clickCount.current % 2 === 0
          ? (svg.style.animationName = 'brightEven')
          : (svg.style.animationName = 'brightOdd');

        clickCount.current += 1;
      }

      const top = document.querySelector('.content-div').scrollTop;

      ref.current.style.top =
        width > 768
          ? e.pageY + top + 'px'
          : document.querySelector('.content-div').style.overflowY === 'hidden'
          ? e.pageY +
            +document
              .querySelector('.content-div')
              .style.top.split('')
              .slice(1, -2)
              .join('') +
            'px'
          : e.pageY + 'px';
      ref.current.style.left = e.pageX + 'px';
      ref.current.classList.add('play');
    },
    [ref, type, width]
  );

  useEffect(() => {
    const elem = isIOS
      ? document.documentElement
      : document.querySelector('.content-div');
    elem.addEventListener('pointerup', fxPlayer);
    return () => {
      elem.removeEventListener('pointerup', fxPlayer);
    };
  }, [fxPlayer]);
};

export default useFxPlayer;
