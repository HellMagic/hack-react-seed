import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import axios from 'axios';
import Cookies from 'cookies-js';
import createRoutes from './routes';
import configureStore from './store';

const client = window.client;
const http_port = window.http_port;
const initialState = window.__INITIAL_STATE__;

window.request = axios.create({
  baseURL: (client.hostname == 'localhost') ? 'http://' + client.hostname + ':' + http_port + '/api/v1' : 'http://' + client.hostname + '/api/v1',
  // timeout: 1000,
  headers: {'x-access-token': Cookies.get('authorization')}
});

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router history={history}>
        {routes}
    </Router>
  </Provider>, document.getElementById('app'));
