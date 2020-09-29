import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";

import reducer from './redux/reducer.js';

import thunk from 'redux-thunk';
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import db from './firebase.js';

// import layouts
import MainMenu from './views/MainMenu.js';
import firebase from 'firebase/app'
import './assets/css/index.css';

const store = createStore(reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(db),
  )
);

const rrfProps = {
  firebase,
  useFirestoreForProfile: true,
  config: db,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <Route path="/main-menu/" component={MainMenu} />
        {/* <Redirect to="/main-menu/dashboard" /> */}
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);