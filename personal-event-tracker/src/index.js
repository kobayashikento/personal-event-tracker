import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import layouts
import MainMenu from './components/MainMenu.js';

import './assets/css/index.css';

ReactDOM.render(
  <Router>
    <Route path="/main-menu" component={MainMenu} />
    <Redirect from="/" to="/main-menu/theme" />
  </Router>,
  document.getElementById('root')
);