import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import LoginPage from './components/LoginPage/LoginPage.jsx'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render( (
<BrowserRouter>
    <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="*" component={()=>(<h1>Not found</h1>)}/>
    </Switch>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
