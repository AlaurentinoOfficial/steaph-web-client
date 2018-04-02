import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './index.css';

import LoginPage from './components/LoginPage/LoginPage.jsx'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( (
<BrowserRouter>
    <div>
        <Route path="/login" component={LoginPage}/>
    </div>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
