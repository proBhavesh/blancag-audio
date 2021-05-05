import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { isMobile, isIOS } from 'react-device-detect';
import { Helmet } from 'react-helmet';

import FxContextComponent from './context/FxContext';
import LoadingIndicatorContextComponent from './context/LoadingIndicatorContext';
import NavBarContextComponent from './context/NavbarContext';
import FooterContextComponent from './context/FooterContext';
import SplashScreenContext from './context/SplashScreenContext';

import { HomePage, DemosPage, MusicPage } from './containers/exporter';

import useDocDims from './helpers/useDocDims';

import { GlobalStyles } from './styles/GlobalStyles';
import useTheme from './styles/useTheme';

const App = () => {
  const location = useLocation();
  const width = useDocDims();
  const theme = useTheme();
  const [themeColor, setThemeColor] = useState(
    location.pathname === '/' ? '#bada55' : '#000'
  );

  useEffect(() => {
    function emptyFunc() {}
    isMobile && document.addEventListener('touchstart', emptyFunc, true);
    return () => {
      isMobile && document.addEventListener('touchmove', emptyFunc, true);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('body').style.backgroundColor = '#000';
      setThemeColor('#000');
    }, 4500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name='theme-color' content={themeColor} />
      </Helmet>
      <GlobalStyles safariMobile={isIOS} />
      {width && (
        <FxContextComponent>
          <LoadingIndicatorContextComponent>
            <NavBarContextComponent>
              <FooterContextComponent>
                <AnimatePresence>
                  <Switch location={location} key={location.pathname}>
                    <Route path='/' exact>
                      <SplashScreenContext>
                        <HomePage />
                      </SplashScreenContext>
                    </Route>
                    <Route path='/demos'>
                      <DemosPage />
                    </Route>
                    <Route path='/music'>
                      <MusicPage />
                    </Route>
                  </Switch>
                </AnimatePresence>
              </FooterContextComponent>
            </NavBarContextComponent>
          </LoadingIndicatorContextComponent>
        </FxContextComponent>
      )}
    </ThemeProvider>
  );
};

export default App;
