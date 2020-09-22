import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './redux/reducer.js';

// import layouts
import MainMenu from './views/MainMenu.js';

import './assets/css/index.css';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/main-menu/" component={MainMenu} />
      <Redirect from="/" to="/main-menu/dashboard" />
    </Router>
  </Provider>,
  document.getElementById('root')
);