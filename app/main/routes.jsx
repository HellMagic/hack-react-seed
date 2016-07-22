import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import Test from '../containers/Test'

export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Test} />
        </Route>
    );
};
