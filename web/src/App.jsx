import React from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Feedback from './pages/Feedback';
import Success from './pages/Success';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Feedback} />
      <Route path="/success" component={Success} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default hot(module)(App);
