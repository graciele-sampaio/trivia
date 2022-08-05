import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from '../pages/Login';
import Settings from '../pages/Settings';

class Rotas extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </Router>
    );
  }
}

export default Rotas;
