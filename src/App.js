import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBarContextComponent from './context/NavbarContext';
import FooterContextComponent from './context/FooterContext';
import { HomePage, DemosPage, MusicPage } from './containers/exporter';

const App = () => {
  return (
    <NavBarContextComponent>
      <FooterContextComponent>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/demos' component={DemosPage} />
            <Route path='/music' component={MusicPage} />
          </Switch>
        </BrowserRouter>
      </FooterContextComponent>
    </NavBarContextComponent>
  );
};

export default App;
