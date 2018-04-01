import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import LoginPage from './components/LoginPage/LoginPage.jsx'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoginPage />, document.getElementById('root'));
registerServiceWorker();
