import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainMenu from './layouts/MainMenu.js';

import './assets/css/index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <MainMenu />
  </React.StrictMode>,
  document.getElementById('root')
);
