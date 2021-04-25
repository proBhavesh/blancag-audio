import React, { useState, useEffect } from 'react';

import { LASER } from '../FxConstants';

import { client as sanity } from '../sanityClient';

export const FxContext = React.createContext({
  activeFx: null,
  setActiveFx: null,
  sizes: {
    chooser: {
      colorBall: {
        desktop: null,
        mobile: null,
      },
      WheelBtns: {
        desktop: null,
        mobile: null,
      },
    },
  },
});

const FxContextComponent = ({ children }) => {
  const [activeFX, setActiveFX] = useState(LASER);
  const [sizes, setSizes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == 'fx'][0]{
      'chooser': {
        'colorBall': {
          'desktop': colorBall_size_desktop,
          'mobile': colorBall_size_mobile,
        },
        'WheelBtns': {
          'desktop': fxWheel_size_desktop,
          'mobile': fxWheel_size_mobile
        }
      }
    }`
      )
      .then((res) => {
        setSizes(res);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? null : (
    <FxContext.Provider
      value={{ activeFx: activeFX, setActiveFx: setActiveFX, sizes: sizes }}
    >
      {children}
    </FxContext.Provider>
  );
};

export default FxContextComponent;
