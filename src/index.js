import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import layouts
import MainMenu from './views/MainMenu.js';

import './assets/css/index.css';

ReactDOM.render(
  <Router>
    <Route path="/main-menu" component={MainMenu} />
  </Router>,
  document.getElementById('root')
);