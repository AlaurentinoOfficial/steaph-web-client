import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import LoginPage from './components/LoginPage/LoginPage.jsx'
import DashboardPage from './components/DashboardPage/DashboardPage';

ReactDOM.render( (
<BrowserRouter>
    <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path="*" component={()=>(<h1>Not found</h1>)}/>
    </Switch>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
