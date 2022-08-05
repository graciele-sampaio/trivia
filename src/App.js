import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* Alterar componente do /game */}
      <Route path="/game" component={ Login } />
    </Switch>
  );
}
