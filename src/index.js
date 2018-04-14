import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


import LoginPage from './components/LoginPage/LoginPage.jsx'
import DashboardPage from './components/DashboardPage/DashboardPage';
import EnvironmentPage from './components/EnvironmentPage/EnvironmentPage';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render( (
<BrowserRouter>
    <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path="/environment/:id" component={EnvironmentPage}/>
        <Route path="*" component={()=>(<h1>Not found</h1>)}/>
    </Switch>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
