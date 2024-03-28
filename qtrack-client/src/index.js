import React from 'react';
import ReactDOM from 'react-dom/client';
import { history } from './lib/external';
import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));

import store from './redux/store';
import Root from './Root';
root.render(React.createElement(Root, { store, history }))

