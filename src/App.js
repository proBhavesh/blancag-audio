import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { isMobile } from 'react-device-detect';

import FxContextComponent from './context/FxContext';
import LoadingIndicatorContextComponent from './context/LoadingIndicatorContext';
import NavBarContextComponent from './context/NavbarContext';
import FooterContextComponent from './context/FooterContext';

import { HomePage, DemosPage, MusicPage } from './containers/exporter';

import useDocDims from './helpers/useDocDims';

const App = () => {
  const location = useLocation();
  const width = useDocDims();

  useEffect(() => {
    function emptyFunc() {}
    isMobile && document.addEventListener('touchstart', emptyFunc, true);
    return () => {
      isMobile && document.addEventListener('touchmove', emptyFunc, true);
    };
  }, [location]);

  return (
    <>
      {width && (
        <FxContextComponent>
          <LoadingIndicatorContextComponent>
            <NavBarContextComponent>
              <FooterContextComponent>
                <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.key}>
                    <Route path='/' exact>
                      <HomePage />
                    </Route>
                    <Route path='/demos'>
                      <DemosPage />
                    </Route>
                  </Switch>
                </AnimatePresence>
                <Switch>
                  <Route path='/music'>
                    <MusicPage />
                  </Route>
                </Switch>
              </FooterContextComponent>
            </NavBarContextComponent>
          </LoadingIndicatorContextComponent>
        </FxContextComponent>
      )}
    </>
  );
};

export default App;
