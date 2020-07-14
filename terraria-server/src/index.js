import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";

import { Router, Route, Switch, Redirect } from "react-router-dom";

// import layouts
import MainMenu from './layouts/MainMenu.js';

import './assets/css/index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/main_menu">
        <MainMenu />
      </Route>
      <Redirect from="/" to="/main_menu/dashbaord" />
    </Switch>
  </Router>,
  document.getElementById('root')
);