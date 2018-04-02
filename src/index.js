import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import './index.css';

import LoginPage from './components/LoginPage/LoginPage.jsx'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( (
<BrowserRouter>
    <Switch>
        <Route path="/login" component={LoginPage}/>
    </Switch>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
