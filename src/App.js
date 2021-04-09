import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBarContextComponent from './context/NavbarContext';
import FooterContextComponent from './context/FooterContext';
import { HomePage, DemosPage, MusicPage } from './containers/exporter';

const App = () => {
  const location = useLocation();

  return (
    <NavBarContextComponent>
      <FooterContextComponent>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path='/' exact component={HomePage} />
            <Route path='/demos' component={DemosPage} />
            <Route path='/music' component={MusicPage} />
          </Switch>
        </AnimatePresence>
      </FooterContextComponent>
    </NavBarContextComponent>
  );
};

export default App;
