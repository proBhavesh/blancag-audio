import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBarContextComponent from './context/NavbarContext';
import { HomePage, DemosPage, MusicPage } from './containers/exporter';

const App = () => {
  return (
    <NavBarContextComponent>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/demos' component={DemosPage} />
          <Route path='/music' component={MusicPage} />
        </Switch>
      </BrowserRouter>
    </NavBarContextComponent>
  );
};

export default App;
