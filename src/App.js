import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import FxContextComponent from './context/FxContext';
import LoadingIndicatorContextComponent from './context/LoadingIndicatorContext';
import NavBarContextComponent from './context/NavbarContext';
import FooterContextComponent from './context/FooterContext';

import { HomePage, DemosPage, MusicPage } from './containers/exporter';

import useDocDims from './helpers/useDocDims';

const WhiteBG = styled.div`
  position: absolute;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  z-index: 9000;
  visibility: ${(props) => (props.showWhite ? 'visible' : 'hidden')};
`;

const App = () => {
  const [showWhite, setShowWhite] = useState(true);

  const location = useLocation();
  const width = useDocDims();

  useEffect(() => {
    const timer = setTimeout(() => setShowWhite(false), 3000);

    function emptyFunc() {}
    isMobile && document.addEventListener('touchstart', emptyFunc, true);
    return () => {
      isMobile && document.addEventListener('touchmove', emptyFunc, true);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <WhiteBG showWhite={showWhite} />
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
