//
//
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

import store from './redux/store'
import history from './history'
import Root from './components/Root'

import './i18n';

const root = createRoot(document.getElementById('root'))
root.render( createElement(
    Root,
    { store, history }
))
