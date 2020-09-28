import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";

import reducer from './redux/reducer.js';

// import layouts
import MainMenu from './views/MainMenu.js';

import './assets/css/index.css';

const store = createStore(reducer);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <Route path="/main-menu/" component={MainMenu} />
    {/* <Redirect to="/main-menu/dashboard" /> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);