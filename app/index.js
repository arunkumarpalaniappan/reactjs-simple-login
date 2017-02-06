import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';

let Login = require('./components/Login');
let Home = require('./components/Home');


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);


function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();
  if (nextState.location.pathname !== '/home') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Home}>
        <Route onEnter={checkAuth}>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Route>
      </Route>
    </Router>
  </Provider>,document.getElementById("content"));
